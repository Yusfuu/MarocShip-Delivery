export const configs = {
  isProduction: process.env.NODE_ENV === 'production',
  database: process.env.DATABASE_URL as string,
  mailFrom: `noreply@${process.env.APP_HOSTNAME as string}`
}