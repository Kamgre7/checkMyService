import { v4 as uuid } from 'uuid';
import { PutUrlBody, PutUrlSchema } from '../schemas/putUrlSchema';

describe('Put url schema', () => {
  let putUrlBody: {
    id: unknown;
  };
  let putUrl: {
    body: typeof putUrlBody;
  };

  beforeEach(() => {
    putUrlBody = {
      id: uuid(),
    };
    putUrl = {
      body: putUrlBody,
    };
  });

  describe('putUrlBody', () => {
    it('Should return true - putUrlBody id is valid id', () => {
      const bodyParse = PutUrlBody.safeParse(putUrlBody);

      expect(bodyParse.success).toBe(true);
    });

    it('Should return false - putUrlBody url not valid id', () => {
      putUrlBody.id = 12;
      const bodyParse = PutUrlBody.safeParse(putUrlBody);

      expect(bodyParse.success).toBe(false);
    });
  });

  describe('putUrlSchema', () => {
    it('Should return true - body id value is valid id ', () => {
      const putParse = PutUrlSchema.safeParse(putUrl);

      expect(putParse.success).toBe(true);
    });

    it('Should return false - body id value is not valid id', () => {
      putUrl.body.id = 'wrong id';
      const putParse = PutUrlSchema.safeParse(putUrl);

      expect(putParse.success).toBe(false);
    });
  });
});
