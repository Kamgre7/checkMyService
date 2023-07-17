import { CronJob } from 'cron';
import { websiteStatusChecker } from './WebsiteStatusChecker';
import { CRON_EVERY_10_SEC } from './utils';

export const cronJob = new CronJob(
  CRON_EVERY_10_SEC,
  async () => await websiteStatusChecker.trackWebsiteStatus()
);
