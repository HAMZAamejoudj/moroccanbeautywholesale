import fs from "fs";
const h = fs.readFileSync(
  "C:/Users/AI HUB/Desktop/mdf/moroccanbeautywholesale.com/moroccanbeautywholesale.com/index.html",
  "utf8",
);
const ids = [...h.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
console.log([...new Set(ids)].join("\n"));
