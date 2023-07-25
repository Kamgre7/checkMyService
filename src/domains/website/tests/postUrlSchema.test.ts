import { PostUrlBody, PostUrlSchema } from '../schemas/postUrlSchema';

describe('Post url schema', () => {
  let postUrlBody: {
    url: unknown;
  };
  let postUrl: {
    body: typeof postUrlBody;
  };

  beforeEach(() => {
    postUrlBody = {
      url: 'https://www.google.com',
    };
    postUrl = {
      body: postUrlBody,
    };
  });

  describe('postUrlBody', () => {
    it('Should return true - postUrlBody url is valid url', () => {
      const bodyParse = PostUrlBody.safeParse(postUrlBody);

      expect(bodyParse.success).toBe(true);
    });

    it('Should return false - postUrlBody url not valid url', () => {
      postUrlBody.url = 'wrong url';
      const bodyParse = PostUrlBody.safeParse(postUrlBody);

      expect(bodyParse.success).toBe(false);
    });
  });

  describe('postUrlSchema', () => {
    it('Should return true - body url value is valid url ', () => {
      const postParse = PostUrlSchema.safeParse(postUrl);

      expect(postParse.success).toBe(true);
    });

    it('Should return false - body url value is not valid url', () => {
      postUrl.body.url = 'wrong url';
      const postParse = PostUrlSchema.safeParse(postUrl);

      expect(postParse.success).toBe(false);
    });
  });
});
