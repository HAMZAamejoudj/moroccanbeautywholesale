import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const artifactDir = 'C:\\Users\\AI HUB\\.gemini\\antigravity-ide\\brain\\ad19a290-be37-499a-a3bc-fabeab5cc43b';
const browserPath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const configs = [
  { name: 'about_en_1440px.png', url: 'http://localhost:3001/en/about/', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'about_en_375px.png', url: 'http://localhost:3001/en/about/', width: 375, height: 812, deviceScaleFactor: 2, isMobile: true },
  { name: 'about_ar_1440px.png', url: 'http://localhost:3001/ar/about/', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'about_ar_375px.png', url: 'http://localhost:3001/ar/about/', width: 375, height: 812, deviceScaleFactor: 2, isMobile: true },
];

async function captureOne(cfg) {
  return new Promise((resolve, reject) => {
    console.log(`Starting capture for ${cfg.name}...`);
    const proc = spawn(browserPath, [
      '--headless=new',
      '--remote-debugging-port=9224',
      '--hide-scrollbars',
      cfg.url
    ]);

    setTimeout(async () => {
      try {
        const res = await fetch('http://127.0.0.1:9224/json');
        const tabs = await res.json();
        const tab = tabs.find(t => t.url.includes('about'));
        if (!tab) {
          proc.kill();
          return reject(new Error('Tab not found'));
        }

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
            width: cfg.width,
            height: cfg.height,
            deviceScaleFactor: cfg.deviceScaleFactor,
            mobile: !!cfg.isMobile
          });

          // Scroll through the page to trigger all lazy-loaded images
          setTimeout(() => {
            send('Runtime.evaluate', {
              expression: `
                (async () => {
                  return new Promise(resolve => {
                    let total = 0;
                    const step = 500;
                    const interval = setInterval(() => {
                      window.scrollBy(0, step);
                      total += step;
                      if (total >= document.body.scrollHeight) {
                        clearInterval(interval);
                        window.scrollTo(0, 0);
                        setTimeout(resolve, 800);
                      }
                    }, 80);
                  });
                })()
              `,
              awaitPromise: true
            });
          }, 1500);
        };

        ws.onmessage = async (event) => {
          const data = JSON.parse(event.data);
          // When the scroll script finishes
          if (data.id && data.result && data.result.result && data.result.result.type === 'undefined') {
            setTimeout(() => {
              send('Page.getLayoutMetrics');
            }, 1000);
          } else if (data.result && data.result.contentSize) {
            const { width, height } = data.result.contentSize;
            send('Page.captureScreenshot', {
              format: 'png',
              captureBeyondViewport: true,
              clip: {
                x: 0,
                y: 0,
                width: cfg.width,
                height: Math.ceil(height),
                scale: 1
              }
            });
          } else if (data.result && data.result.data) {
            const filePath = path.join(artifactDir, cfg.name);
            fs.writeFileSync(filePath, Buffer.from(data.result.data, 'base64'));
            console.log(`Saved screenshot to ${filePath}`);
            ws.close();
            proc.kill();
            resolve();
          }
        };

        ws.onerror = (err) => {
          proc.kill();
          reject(err);
        };
      } catch (e) {
        proc.kill();
        reject(e);
      }
    }, 2500);
  });
}

async function runAll() {
  for (const cfg of configs) {
    await captureOne(cfg);
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('All screenshots captured successfully!');
}

runAll().catch(console.error);
