import express from 'express';
import { appConfig } from './src/config/appConfig';
import { cronJob } from './src/domains/website/cron/cronJob';
import { urlRouter } from './src/routes/urlRouter';

const app = express();

app.use(express.json());

cronJob.start();

app.use('/', urlRouter);

app.listen(appConfig.port, appConfig.hostName, () => {
  console.log(`Listening on port ${appConfig.host}:${appConfig.port}`);
});
