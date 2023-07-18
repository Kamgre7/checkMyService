export const CRON_EVERY_10_SEC = '*/10 * * * * *';

export const httpStatusCodeRegex = /^2\d{2}$/;

export const getHostName = (link: string) => {
  const [url, protocol, host] = link.match(
    /^(https?:\/\/)?(.*)$/
  ) as RegExpMatchArray;

  return host;
};
