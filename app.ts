import express from 'express';
import { config } from './config/default';
import { cronJob } from './utils/cronJob';

const app = express();

app.use(express.json());

cronJob.start();

app.listen(config.port, config.hostName, () => {
  console.log(`Listening on port ${config.host}:${config.port}`);
});
