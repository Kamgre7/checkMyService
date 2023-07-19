import express from 'express';
import { config } from './src/config/default';
import { cronJob } from './src/domains/website/cron/cronJob';
import { urlRouter } from './src/routes/urlRouter';

const app = express();

app.use(express.json());

cronJob.start();

app.use('/', urlRouter);

app.listen(config.port, config.hostName, () => {
  console.log(`Listening on port ${config.host}:${config.port}`);
});
