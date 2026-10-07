import { spawn } from 'child_process';

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
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({
        id: 2,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            Array.from(document.querySelectorAll('h1, h2, h3')).map(el => ({
              tag: el.tagName,
              text: el.innerText.trim().slice(0, 40),
              classes: el.className,
              computedFontSize: window.getComputedStyle(el).fontSize,
              computedFontWeight: window.getComputedStyle(el).fontWeight,
              parentTag: el.parentElement ? el.parentElement.tagName : null
            }))
          `,
          returnByValue: true
        }
      }));
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === 2) {
        console.log('--- ALL HEADINGS ---');
        console.log(JSON.stringify(data.result.result.value, null, 2));
        proc.kill();
        process.exit(0);
      }
    };
  } catch (e) {
    console.error(e);
    proc.kill();
  }
}, 2500);
