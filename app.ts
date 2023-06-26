import { CronJob } from 'cron';
import { CRON_EVERY_10_SEC } from './utils/utils';
import { checkMyService } from './utils/CheckMyService';

const cronJob = new CronJob(
  CRON_EVERY_10_SEC,
  async () => await checkMyService.trackWebsiteStatus()
);

cronJob.start();
