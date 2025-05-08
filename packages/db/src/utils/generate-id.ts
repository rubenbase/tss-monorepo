import { v7 as uuidv7 } from 'uuid';

export function generatePrefixedId<Prefix extends string>(prefix: Prefix) {
  return function (): string {
    const uuid = uuidv7();
    return `${prefix}_${uuid}`;
  };
}

export function generateId() {
  const uuid = uuidv7();
  return uuid;
}
