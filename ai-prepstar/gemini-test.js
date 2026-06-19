const fs = require('fs');
const path = require('path');
const env = fs.readFileSync(path.resolve('.env.local'),'utf8').split(/\r?\n/).filter(Boolean);
const envObj = {};
env.forEach(line => { const idx = line.indexOf('='); if (idx !== -1) envObj[line.slice(0,idx)] = line.slice(idx+1); });
const apiKey = envObj.GEMINI_API_KEY || envObj.OPENAI_API_KEY;
if (!apiKey) { console.error('no key'); process.exit(1); }
const rawModel = envObj.GEMINI_MODEL || 'text-bison-001';
const model = rawModel.startsWith('models/') ? rawModel : `models/${rawModel}`;
const url = `https://generativelanguage.googleapis.com/v1/${model}:generateContent`;
const useQuery = apiKey.startsWith('AIza');
const requestUrl = useQuery ? `${url}?key=${apiKey}` : url;
const headers = { 'Content-Type': 'application/json' };
if (!useQuery) headers.Authorization = `Bearer ${apiKey}`;
const body = JSON.stringify({
  contents: [{ parts: [{ text: 'Hello world' }] }],
  generationConfig: {
    temperature: 0.2,
    maxOutputTokens: 20
  }
});
(async () => {
  const res = await fetch(requestUrl, { method: 'POST', headers, body });
  const text = await res.text();
  console.log('status', res.status, res.statusText);
  console.log(text);
})();
