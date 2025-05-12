// import { z } from 'zod';

export interface IRecord {
    label: string,
    value: string | number | boolean;
}

// export const RecordSchema = z.object({
//   label: z.string(),
//   value: z.union([z.string(), z.number(), z.boolean()]),
// });

// export type IRecord = z.infer<typeof RecordSchema>;
