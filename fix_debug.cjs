const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const regex = /app\.get\("\/api\/debug-priminfo", async \(req, res\) => \{[\s\S]*?\}\);/m;

const replacement = `app.get("/api/debug-priminfo", async (req, res) => {
  try {
    let rawResponseBody = null;
    let statusCodes = null;
    let headers = null;
    let fetchError = null;

    try {
      const fetchUrl = \`http://\${req.headers.host}/api/priminfo/praemien?zipCode=1000\`;
      const response = await fetch(fetchUrl);
      statusCodes = response.status;
      headers = Object.fromEntries(response.headers.entries());
      rawResponseBody = await response.text();
    } catch (e) {
      fetchError = e.message;
    }

    const result = {
      cwd: process.cwd(),
      dirname: typeof __dirname !== "undefined" ? __dirname : "undefined",
      filesInPublic: fs.existsSync(path.join(process.cwd(), "public")) ? fs.readdirSync(path.join(process.cwd(), "public")) : [],
      filesInDist: fs.existsSync(path.join(process.cwd(), "dist")) ? fs.readdirSync(path.join(process.cwd(), "dist")) : [],
      premiumsDbKeys: Object.keys(premiumsDb).length,
      loadError: premiumsLoadError,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        PRIMINFO_API_KEY: process.env.PRIMINFO_API_KEY ? "Set" : "Not Set"
      },
      diagnosticFetch: {
        url: \`/api/priminfo/praemien?zipCode=1000\`,
        status: statusCodes,
        headers,
        body: rawResponseBody ? JSON.parse(rawResponseBody) : null,
        error: fetchError
      }
    };
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});`;

content = content.replace(regex, replacement);
fs.writeFileSync('server.ts', content);
