import { z } from 'zod';
// import { TypeSchema } from './interfaces/i-type';
// import { RecordSchema } from './interfaces/i-record';

const schemaMap = {
  // IRecord: RecordSchema,
  // IType: TypeSchema,
  // IRecordArray: z.array(RecordSchema),
  string: z.string(),
  boolean: z.boolean(),
  number: z.number(),
};

export const SchemaMap = {
  map: schemaMap,
  getSchema<K extends keyof typeof schemaMap>(key: K) {
    return schemaMap[key];
  },
};

export type SchemaKeyMap = {
  name: 'string';
  type: 'IType';
  description: 'string';
  isImportant: 'boolean';
  valueX: 'IRecordArray';
  valueY: 'IRecordArray';
  valueZ: 'IRecordArray';
};

type FormControlTypes = {
  // [K in keyof SchemaKeyMap]: z.infer<(typeof SchemaMap.map)[SchemaKeyMap[K]]>;
};

export type IMyFormControls = FormControlTypes;
