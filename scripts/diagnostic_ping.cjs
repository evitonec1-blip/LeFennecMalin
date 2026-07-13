const http = require('http');

const req = http.get('http://localhost:3000/api/priminfo/praemien?zipCode=1201&franchise=2500&ageCategory=adult&accident=1', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
  
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    console.log('BODY:', rawData);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});
