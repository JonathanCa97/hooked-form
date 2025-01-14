import * as React from 'react';
import { get } from './helpers/operations';
import { useContextEmitter } from './useContextEmitter';

export interface FieldOperations<T> {
  add: (item: T) => void;
  insert: (at: number, element: T) => void;
  move: (from: number, to: number) => void;
  remove: (toDelete: number) => void;
  replace: (at: number, element: T) => void;
  swap: (first: number, second: number) => void;
}

export interface FieldInformation<T> {
  error: string | null;
  value: Array<T>;
}

export default function useFieldArray<T = any>(
  fieldId: string,
): [FieldOperations<T>, FieldInformation<T>] {
  if (process.env.NODE_ENV !== 'production' && (!fieldId || typeof fieldId !== 'string')) {
    throw new Error('The FieldArray needs a valid "fieldId" property to function correctly.');
  }

  const ctx = useContextEmitter(fieldId);
  const value: Array<any> = get(ctx.values, fieldId);

  return [
    {
      add: React.useCallback(
        (element: T) => {
          ctx.setFieldValue(fieldId, [...value, element]);
        },
        [value],
      ),
      insert: React.useCallback(
        (at: number, element: T) => {
          const result = [...value];
          result.splice(at, 0, element);
          ctx.setFieldValue(fieldId, result);
        },
        [value],
      ),
      move: React.useCallback(
        (from: number, to: number) => {
          const result = [...value];
          result.splice(from, 1);
          result.splice(to, 0, value[from]);
          ctx.setFieldValue(fieldId, result);
        },
        [value],
      ),
      remove: React.useCallback(
        (index: number) => {
          ctx.setFieldValue(
            fieldId,
            value.filter((_, i) => i !== index),
          );
        },
        [value],
      ),
      replace: React.useCallback(
        (at: number, element: T) => {
          const result = [...value];
          result[at] = element;
          ctx.setFieldValue(fieldId, result);
        },
        [value],
      ),
      swap: React.useCallback(
        (from: number, to: number) => {
          const result = [...value];
          result[from] = value[to];
          result[to] = value[from];
          ctx.setFieldValue(fieldId, result);
        },
        [value],
      ),
    },
    {
      error: get(ctx.errors, fieldId),
      value,
    },
  ];
}
