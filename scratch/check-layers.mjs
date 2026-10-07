import http from 'http';

http.get('http://localhost:3001/_next/static/chunks/[root-of-the-server]__3ffa8165._.css', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const lines = d.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('.text-\\[30px\\]') || l.includes('@layer')) {
        console.log(`Line ${i}:`, l);
      }
    });
  });
});
