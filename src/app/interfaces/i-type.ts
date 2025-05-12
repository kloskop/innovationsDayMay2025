// import { z } from 'zod';

export interface IType {
    label: string;
    value: 'general' | 'technical' | 'documentation';
}

// export const TypeSchema = z.object({
//     label: z.string(),
//     value: z.enum(['general', 'technical', 'documentation']),
// });

// export type IType = z.infer<typeof TypeSchema>;