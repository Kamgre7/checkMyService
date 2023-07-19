export const getHostName = (link: string) => {
  const [url, protocol, host] = link.match(
    /^(https?:\/\/)?(.*)$/
  ) as RegExpMatchArray;

  return host;
};
