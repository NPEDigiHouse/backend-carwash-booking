import express, { Express } from 'express';
import cors from 'cors';
import http from 'http';

const app: Express = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

server.listen(8000, () => {
  console.log('Server running on port 8000');
});
