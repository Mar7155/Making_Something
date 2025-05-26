import { handler } from './dist/server/entry.mjs';
import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  return handler(req, res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
