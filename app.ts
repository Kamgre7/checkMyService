import express from 'express';
import { config } from './config/default';
import { cronJob } from './utils/cronJob';
import { urlRouter } from './routes/urlRouter';
import { urlRepository } from './repository/UrlRepository';

const app = express();

app.use(express.json());

cronJob.start();

app.use('/', urlRouter);

app.listen(config.port, config.hostName, () => {
  console.log(`Listening on port ${config.host}:${config.port}`);
});

(async () => {
  await urlRepository.init();
})();
