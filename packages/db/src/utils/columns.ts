import { varchar, timestamp, AnyPgColumn } from 'drizzle-orm/pg-core';
import { generateId, generatePrefixedId } from './generate-id';

/**
 * Custom column type for prefixed IDs
 */
export function prefixedIdColumn<Prefix extends string>(prefix: Prefix) {
  return varchar('id', { length: 128 })
    .primaryKey()
    .$type<string>()
    .$defaultFn(generatePrefixedId(prefix));
}

/**
 * Custom column type for regular IDs
 * @returns
 */
export function idColumn() {
  return varchar('id', { length: 128 }).primaryKey().$defaultFn(generateId);
}

/**
 * Adds standardized timestamp columns for createdAt and updatedAt
 * @returns Object containing createdAt and updatedAt timestamp columns
 * @example
 * const user = pgTable('user', {
 *   ...timestampColumns(),
 *   name: text('name').notNull(),
 * });
 */
export const timestampColumns = () => ({
  createdAt: timestamp('created_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  })
    .$onUpdate(() => new Date())
    .defaultNow()
    .notNull(),
});

export const timestampColumn = (columnName: string) =>
  timestamp(columnName, {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  });

/**
 * Creates a prefixed foreign key column that references a prefixed ID
 *
 * @param columnName The name of the column
 * @param prefix The prefix of the ID type being referenced
 * @param options Configuration options
 * @returns A configured foreign key column
 * @example
 * organizationId = foreignPrefixedIdColumn('organization_id', {
 *   notNull: true,
 *   references: () => organizations.id,
 * });
 * userId = foreignPrefixedIdColumn('user_id', {
 *   notNull: true,
 *   references: () => users.id,
 * });
 */
export function foreignPrefixedIdColumn<T extends AnyPgColumn>(
  columnName: string,
  options: {
    notNull?: boolean;
    onDelete?:
      | 'cascade'
      | 'restrict'
      | 'set null'
      | 'set default'
      | 'no action';
    references?: () => T;
  } = {}
) {
  const { notNull = false, onDelete = 'cascade', references } = options;

  let column = varchar(columnName, { length: 128 }).$type<string>();

  if (notNull) {
    column = column.notNull();
  }

  if (references) {
    column = column.references(references, { onDelete });
  }

  return column;
}

/**
 * Creates a foreign key column that references a regular ID
 *
 * @param columnName The name of the column
 * @param options Configuration options
 * @returns A configured foreign key column
 * @example
 * const organizationId = foreignIdColumn('organization_id', {
 *   notNull: true,
 *   references: () => organizations.id,
 * });
 * const userId = foreignIdColumn('user_id', {
 *   notNull: true,
 *   references: () => users.id,
 * });
 */
export function foreignIdColumn(
  columnName: string,
  options: {
    notNull?: boolean;
    onDelete?:
      | 'cascade'
      | 'restrict'
      | 'set null'
      | 'set default'
      | 'no action';
    references?: () => AnyPgColumn;
  }
) {
  const { notNull = false, onDelete = 'cascade', references } = options;

  let column = varchar(columnName, { length: 128 }).$type<string>();

  if (notNull) {
    column = column.notNull();
  }

  if (references) {
    column = column.references(references, { onDelete });
  }

  return column;
}
