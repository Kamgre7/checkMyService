import { CronJob } from 'cron';
import { CRON_EVERY_10_SEC } from './utils';
import { websiteStatusChecker } from './CheckMyService';

export const cronJob = new CronJob(
  CRON_EVERY_10_SEC,
  async () => await websiteStatusChecker.trackWebsiteStatus()
);
