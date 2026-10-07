import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const artifactDir = 'C:\\Users\\AI HUB\\.gemini\\antigravity-ide\\brain\\ad19a290-be37-499a-a3bc-fabeab5cc43b';
const browserPath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testCapture() {
  const tempProfile = path.join(os.tmpdir(), 'edge-test-profile-' + Date.now());
  fs.mkdirSync(tempProfile, { recursive: true });

  const port = 9333;
  console.log('Spawning edge on port', port);
  const proc = spawn(browserPath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempProfile}`,
    '--hide-scrollbars',
    'http://localhost:3001/en/private-label/'
  ]);

  proc.stderr.on('data', d => console.log('Edge err:', d.toString().slice(0, 100)));

  await new Promise(r => setTimeout(r, 3000));

  try {
    const res = await fetch(`http://127.0.0.1:${port}/json`);
    const tabs = await res.json();
    console.log('Found tabs:', tabs.length, tabs.map(t => t.url));
    const tab = tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = () => {
        console.log('WebSocket open!');
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'DOM.enable' }));
        ws.send(JSON.stringify({
          id: 3,
          method: 'Emulation.setDeviceMetricsOverride',
          params: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }
        }));

        setTimeout(() => {
          ws.send(JSON.stringify({ id: 4, method: 'Page.getLayoutMetrics' }));
        }, 1500);
      };

      ws.onmessage = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === 4 && msg.result && msg.result.contentSize) {
          const { width, height } = msg.result.contentSize;
          console.log('Page content size:', width, height);
          ws.send(JSON.stringify({
            id: 5,
            method: 'Page.captureScreenshot',
            params: {
              format: 'png',
              captureBeyondViewport: true,
              clip: { x: 0, y: 0, width: 1440, height: Math.min(Math.ceil(height), 8000), scale: 1 }
            }
          }));
        } else if (msg.id === 5 && msg.result && msg.result.data) {
          const outPath = path.join(artifactDir, 'private_label_ingredients_1440px.png');
          fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
          console.log('Saved to', outPath);
          ws.close();
          resolve();
        }
      };

      ws.onerror = (e) => reject(e);
    });

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    proc.kill();
    try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch {}
  }
}

testCapture();
