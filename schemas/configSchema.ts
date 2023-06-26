import { z } from 'zod';

export const ConfigSchema = z.object({
  urlFilePath: z.string().nonempty(),
  urlFilename: z.string().nonempty(),
});
