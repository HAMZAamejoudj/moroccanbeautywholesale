import { spawn } from 'child_process';
import fs from 'fs';

const browserPath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const proc = spawn(browserPath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  'http://localhost:3001/en/about/'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9222/json');
    const tabs = await res.json();
    const tab = tabs.find(t => t.url.includes('about'));
    if (!tab) return;

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    ws.onopen = () => {
      // Evaluate document query
      const msg = {
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            Array.from(document.querySelectorAll('h1, h2, p')).slice(0, 15).map(el => {
              const comp = window.getComputedStyle(el);
              return {
                tag: el.tagName,
                text: el.textContent.trim().slice(0, 35),
                fontSize: comp.fontSize,
                fontWeight: comp.fontWeight,
                lineHeight: comp.lineHeight,
                color: comp.color,
                classes: el.className
              };
            })
          `,
          returnByValue: true
        }
      };
      ws.send(JSON.stringify(msg));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === 1) {
        console.log('--- COMPUTED STYLES IN BROWSER ---');
        console.table(data.result.result.value);
        proc.kill();
        process.exit(0);
      }
    };
  } catch (e) {
    console.error(e);
    proc.kill();
  }
}, 2500);
