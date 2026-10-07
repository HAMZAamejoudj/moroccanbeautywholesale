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
      ws.send(JSON.stringify({ id: 1, method: 'DOM.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'CSS.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'DOM.getDocument', params: { depth: -1 } }));
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.id === 3) {
        ws.send(JSON.stringify({
          id: 4,
          method: 'DOM.querySelector',
          params: { nodeId: data.result.root.nodeId, selector: 'h2' }
        }));
      } else if (data.id === 4) {
        ws.send(JSON.stringify({
          id: 5,
          method: 'CSS.getMatchedStylesForNode',
          params: { nodeId: data.result.nodeId }
        }));
      } else if (data.id === 5) {
        console.log('--- MATCHED CSS RULES FOR H2 ---');
        console.log(JSON.stringify(data.result.matchedCSSRules.map(r => ({
          selector: r.rule.selectorList.text,
          origin: r.rule.origin,
          properties: r.rule.style.cssProperties.filter(p => p.name.includes('font') || p.name.includes('color')).map(p => `${p.name}: ${p.value}`)
        })), null, 2));
        proc.kill();
        process.exit(0);
      }
    };
  } catch (e) {
    console.error(e);
    proc.kill();
  }
}, 2500);
