import { UrlSchema } from '../schemas/urlSchema';

export interface IUrlValidator {
  filterValidURL(links: string[]): string[];
  removeWhiteSpacesAndSplit(data: string): string[];
}

export class UrlValidator implements IUrlValidator {
  filterValidURL(links: string[]): string[] {
    return links.filter((link) => UrlSchema.safeParse(link).success);
  }

  removeWhiteSpacesAndSplit(data: string): string[] {
    return data.replace(/\r\n/g, '\n').split('\n');
  }
}

export const urlValidator = new UrlValidator();
