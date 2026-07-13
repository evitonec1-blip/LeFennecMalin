export async function checkApiHealth(reqUrl?: string) {
  // Always use localhost for internal server-to-server checks to bypass auth proxy
  let baseUrl = "http://localhost:3000";
  
  const url = reqUrl || `${baseUrl}/api/priminfo/praemien?zipCode=1201&franchise=2500&ageCategory=adult&accident=1`;
  
  console.log(`[HealthCheck] Performing GET request to Priminfo endpoint: ${url}`);
  try {
    const response = await fetch(url);
    const text = await response.text();
    console.log(`[HealthCheck] Status: ${response.status} ${response.statusText}`);
    console.log(`[HealthCheck] Headers:`, Object.fromEntries(response.headers.entries()));
    console.log(`[HealthCheck] Full Error Body:`, text);
    
    let parsedBody = text;
    try {
       parsedBody = JSON.parse(text);
    } catch(e) {}

    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: parsedBody
    };
  } catch (error: any) {
    console.error(`[HealthCheck] Request failed completely:`, error);
    return { error: error.message, attemptedUrl: url };
  }
}
