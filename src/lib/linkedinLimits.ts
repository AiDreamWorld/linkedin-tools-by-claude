/**
 * Official LinkedIn character limits for all field types.
 */

export const LINKEDIN_LIMITS = {
  HEADLINE: 220,
  ABOUT: 2600,
  POST: 3000,
  CONNECTION_MESSAGE: 300,
  INMAIL_SUBJECT: 200,
  INMAIL_BODY: 1900,
  COMMENT: 1250,
  RECOMMENDATION: 3000,
  FIRST_NAME: 20,
  LAST_NAME: 40,
  COMPANY_NAME: 100,
  JOB_TITLE: 100,
} as const;

export type LinkedInField = keyof typeof LINKEDIN_LIMITS;
