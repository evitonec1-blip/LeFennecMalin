import { parseStringPromise } from 'xml2js';

export default async function handler(req: any, res: any) {
  // 1. Configure CORS headers for the proxy
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization, X-Requested-With");

  // Handle OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { zipCode, franchise, ageCategory, accident } = req.query || {};

    if (!zipCode) {
      return res.status(400).json({ error: "Missing required parameter: zipCode" });
    }

    console.log(`[Proxy] Incoming request for zipCode: ${zipCode}, franchise: ${franchise}`);

    // Define the official OpenData / Priminfo API URL
    // Using standard OpenData endpoint as base/example.
    const apiUrl = `https://opendata.swiss/api/3/action/package_search?q=priminfo`; 
    
    console.log(`[Proxy] Forwarding request to: ${apiUrl}`);

    // 2. Fetch with proper headers (User-Agent, Accept: application/json)
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SwissHealthProxy/1.0)",
        "Accept": "application/json, application/xml, text/xml",
      },
    });

    // 3. Robust error handling and status code logging
    if (!response.ok) {
      console.error(`[Proxy Error] Upstream API responded with status: ${response.status} ${response.statusText}`);
      
      let errorData = null;
      try {
        errorData = await response.text();
      } catch (e) {
        // ignore
      }

      return res.status(response.status).json({
        error: "Upstream API error",
        statusCode: response.status,
        details: errorData,
      });
    }

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();
    let data;

    // 4. Strictly parse the XML/JSON response
    if (contentType.includes("application/xml") || contentType.includes("text/xml") || text.trim().startsWith("<")) {
      console.log(`[Proxy] Parsing XML response from upstream...`);
      try {
        data = await parseStringPromise(text, { explicitArray: false });
      } catch (e: any) {
        console.error(`[Proxy Error] Failed to parse XML:`, e);
        return res.status(502).json({
          error: "Invalid XML format from upstream API",
          statusCode: 502
        });
      }
    } else {
      console.log(`[Proxy] Parsing JSON response from upstream...`);
      try {
        data = JSON.parse(text);
      } catch (e: any) {
        console.error(`[Proxy Error] Failed to parse JSON:`, e);
        return res.status(502).json({
          error: "Invalid JSON format from upstream API",
          statusCode: 502
        });
      }
    }

    console.log(`[Proxy] Successfully retrieved and parsed data from upstream API.`);

    // 5. Return standardized JSON to the frontend
    return res.status(200).json({
      success: true,
      source: "opendata.swiss",
      data: data
    });

  } catch (error: any) {
    // Catch any network errors or parsing exceptions to prevent 500 crashes
    console.error(`[Proxy Error] Internal Server Error:`, error.message, error.stack);
    return res.status(500).json({
      error: "Internal Server Error in Proxy",
      message: String(error)
    });
  }
}
