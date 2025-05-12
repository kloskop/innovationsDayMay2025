import { z } from 'zod';
import { SchemaMap } from './schema-map';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeCheckingService {
  parseAsType<K extends keyof typeof SchemaMap.map>(
    object: unknown,
    typeKey: K
  ): z.infer<(typeof SchemaMap.map)[K]> | null {
    const schema = SchemaMap.getSchema(typeKey);
    const result = schema.safeParse(object);
    if (result.success) {
      return result.data;
    } else {
      console.error(`Parsing error - expected type: ${typeKey}`);
      return null;
    }
  }
}
