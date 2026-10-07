import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const artifactDir = 'C:\\Users\\AI HUB\\.gemini\\antigravity-ide\\brain\\ad19a290-be37-499a-a3bc-fabeab5cc43b';
const browserPath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const configs = [
  { name: 'private_label_ingredients_1440px.png', url: 'http://localhost:3001/en/private-label/#ingredients-catalog' },
  { name: 'private_label_ingredients_ar_1440px.png', url: 'http://localhost:3001/ar/private-label/#ingredients-catalog' },
];

async function captureViewport(cfg, port) {
  const tempProfile = path.join(os.tmpdir(), `edge-cap-${port}-${Date.now()}`);
  fs.mkdirSync(tempProfile, { recursive: true });

  console.log(`Starting capture for ${cfg.name} on port ${port}...`);
  const proc = spawn(browserPath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempProfile}`,
    '--hide-scrollbars',
    '--window-size=1440,1600',
    cfg.url
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const res = await fetch(`http://127.0.0.1:${port}/json`);
    const tabs = await res.json();
    const tab = tabs.find(t => t.url.includes('private-label')) || tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      let idCounter = 1;
      const send = (method, params = {}) => {
        const id = idCounter++;
        ws.send(JSON.stringify({ id, method, params }));
        return id;
      };

      ws.onopen = () => {
        send('Page.enable');
        send('DOM.enable');
        send('Runtime.enable');
        send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 1600,
          deviceScaleFactor: 1,
          mobile: false
        });

        setTimeout(() => {
          send('Runtime.evaluate', {
            expression: `
              const el = document.getElementById('ingredients-catalog');
              if (el) {
                el.scrollIntoView({ behavior: 'instant', block: 'start' });
              }
            `
          });

          setTimeout(() => {
            send('Page.captureScreenshot', {
              format: 'png'
            });
          }, 1500);
        }, 1500);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.result && data.result.data) {
          const outPath = path.join(artifactDir, cfg.name);
          fs.writeFileSync(outPath, Buffer.from(data.result.data, 'base64'));
          console.log(`Successfully saved screenshot to ${outPath}`);
          ws.close();
          resolve();
        }
      };

      ws.onerror = (err) => reject(err);
    });
  } finally {
    proc.kill();
    try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch {}
  }
}

async function run() {
  await captureViewport(configs[0], 9350);
  await new Promise(r => setTimeout(r, 1000));
  await captureViewport(configs[1], 9351);
  console.log('All screenshots completed successfully!');
}

run().catch(console.error);
