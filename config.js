import { parse } from 'https://cdn.jsdelivr.net/npm/dotenv@16.4.5/+esm';

let env = {};
try {
  const response = await fetch('.env');
  const text = await response.text();
  env = parse(text);
} catch (err) {
  console.error('Failed to load .env', err);
}

window.CONFIG = {
  SERVER_URL: env.SERVER_URL || '',
  AUTH_TOKEN: env.AUTH_TOKEN || ''
};
