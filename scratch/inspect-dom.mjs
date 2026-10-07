import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';

const paths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = paths.find(p => fs.existsSync(p));
console.log('Found browser:', browserPath);

if (browserPath) {
  // Launch browser headless with remote debugging port
  const proc = spawn(browserPath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    'http://localhost:3001/en/about/'
  ]);

  setTimeout(async () => {
    try {
      const res = await fetch('http://127.0.0.1:9222/json');
      const tabs = await res.json();
      console.log('Tabs:', tabs.map(t => ({ title: t.title, url: t.url, ws: t.webSocketDebuggerUrl })));
      
      const tab = tabs.find(t => t.url.includes('about'));
      if (tab && tab.webSocketDebuggerUrl) {
        console.log('Connecting to WS:', tab.webSocketDebuggerUrl);
        // We can inspect via WebSocket
      }
    } catch (e) {
      console.error('Error fetching tabs:', e);
    } finally {
      proc.kill();
    }
  }, 2000);
}
