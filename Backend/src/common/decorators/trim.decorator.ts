import { Transform } from 'class-transformer';

export const Trim = () =>
  Transform(({ value }: { value: unknown }) =>
    typeof value === 'string'
      ? value
          .split('')
          .filter((character) => {
            const code = character.charCodeAt(0);
            return code >= 32 && code !== 127;
          })
          .join('')
          .trim()
      : value,
  );
