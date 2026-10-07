import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

const artifactDir = 'C:\\Users\\AI HUB\\.gemini\\antigravity-ide\\brain\\ad19a290-be37-499a-a3bc-fabeab5cc43b';
const browserPath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempProfile = path.join(os.tmpdir(), `edge-clays-${Date.now()}`);
fs.mkdirSync(tempProfile, { recursive: true });

const proc = spawn(browserPath, [
  '--headless=new',
  '--remote-debugging-port=9360',
  `--user-data-dir=${tempProfile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  '--window-size=1440,1200',
  'http://localhost:3001/en/private-label/#ingredients-catalog'
]);

await new Promise(r => setTimeout(r, 2500));
const res = await fetch('http://127.0.0.1:9360/json');
const tabs = await res.json();
const tab = tabs.find(t => t.url && t.url.includes('private-label')) || tabs[tabs.length - 1];
const ws = new WebSocket(tab.webSocketDebuggerUrl);

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
    height: 1200,
    deviceScaleFactor: 1,
    mobile: false
  });

  setTimeout(() => {
    send('Runtime.evaluate', {
      expression: `
        const buttons = Array.from(document.querySelectorAll('button'));
        const claysBtn = buttons.find(b => b.textContent && b.textContent.includes('Clays and powders'));
        if (claysBtn) {
          claysBtn.click();
        }
      `
    });

    setTimeout(() => {
      send('Runtime.evaluate', {
        expression: `
          const el = document.getElementById('ingredients-catalog');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        `
      });

      setTimeout(() => {
        send('Page.captureScreenshot', { format: 'png' });
      }, 1000);
    }, 1000);
  }, 1500);
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.result && data.result.data) {
    const outPath = path.join(artifactDir, 'clays_powders_clean.png');
    fs.writeFileSync(outPath, Buffer.from(data.result.data, 'base64'));
    console.log(`Successfully saved screenshot to ${outPath}`);
    ws.close();
    proc.kill();
    process.exit(0);
  }
};
