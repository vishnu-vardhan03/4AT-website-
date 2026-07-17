import { Transform } from 'class-transformer';

export const Trim = () =>
  Transform(({ value }: { value: unknown }) =>
    typeof value === 'string'
      ? value.replace(/\0/g, '').replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
      : value,
  );
