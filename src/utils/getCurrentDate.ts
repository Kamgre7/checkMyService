export const getCurrentDate = () =>
  new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
