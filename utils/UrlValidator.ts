import { UrlSchema } from '../schemas/urlSchema';

export interface IUrlValidator {
  filterValidURL(links: string[]): string[];
}

export class UrlValidator implements IUrlValidator {
  filterValidURL(links: string[]) {
    return links.filter((link) => UrlSchema.safeParse(link).success);
  }
}

export const urlValidator = new UrlValidator();
