import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import {
  foreignPrefixedIdColumn,
  idColumn,
  prefixedIdColumn,
  timestampColumns,
} from '../utils/columns';

export const user = pgTable('user', {
  id: prefixedIdColumn('user'),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  role: text('role'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
  onboardingCompleted: boolean('onboarding_completed').default(false).notNull(),
  ...timestampColumns(),
});

export type User = typeof user.$inferSelect;

export const session = pgTable('session', {
  id: prefixedIdColumn('sess'),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: foreignPrefixedIdColumn('user_id', {
    notNull: true,
    onDelete: 'cascade',
    references: () => user.id,
  }),
  impersonatedBy: text('impersonated_by'),
  activeOrganizationId: text('active_organization_id'),
  ...timestampColumns(),
});

export type Session = typeof session.$inferSelect;

export const account = pgTable('account', {
  id: prefixedIdColumn('acc'),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: foreignPrefixedIdColumn('user_id', {
    notNull: true,
    onDelete: 'cascade',
    references: () => user.id,
  }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  ...timestampColumns(),
});

export type Account = typeof account.$inferSelect;

export const verification = pgTable('verification', {
  id: idColumn(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ...timestampColumns(),
});

export type Verification = typeof verification.$inferSelect;
