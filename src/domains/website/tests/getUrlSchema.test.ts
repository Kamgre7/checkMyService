import { v4 as uuid } from 'uuid';
import { GetUrlParams, GetUrlSchema } from '../schemas/getUrlSchema';

describe('Get url schema', () => {
  let getUrlParams: {
    id: unknown;
  };
  let getUrl: {
    params: typeof getUrlParams;
  };

  beforeEach(() => {
    getUrlParams = {
      id: uuid(),
    };
    getUrl = {
      params: getUrlParams,
    };
  });

  describe('getUrlParams', () => {
    it('Should return true - getUrlParam id is uuid', () => {
      const paramsParse = GetUrlParams.safeParse(getUrlParams);

      expect(paramsParse.success).toBe(true);
    });

    it('Should return false - getUrlParam id is not uuid', () => {
      getUrlParams.id = 10;
      const paramsParse = GetUrlParams.safeParse(getUrlParams);

      expect(paramsParse.success).toBe(false);
    });
  });

  describe('getUrlSchema', () => {
    it('Should return true - param value is uuid type', () => {
      const getParse = GetUrlSchema.safeParse(getUrl);

      expect(getParse.success).toBe(true);
    });

    it('Should return false - param value is not uuid', () => {
      getUrl.params.id = 10;
      const paramsParse = GetUrlSchema.safeParse(getUrl);

      expect(paramsParse.success).toBe(false);
    });
  });
});
