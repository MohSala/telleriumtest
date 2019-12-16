/**
 * created by Adeyinka Micheal
 */
require('dotenv').config()

const appName = 'API test';

export const config = {
  appName,
  server: {
    url: process.env.APP_URL,
    port: process.env.APP_PORT
  },
  mail: {
    send_grid: process.env.SENDGRID_API_KEY
  },
  baseUrl: process.env.BASE_URL,
  mongo: {
    salt_value: 10,
    connection: {
      host: process.env.MONGODB_HOST,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      port: process.env.MONGODB_PORT,
      dbProd: process.env.MONGODB_DATABASE_NAME
    },
    collections: {
      users: 'users',
      hobby: 'hobbies'
    },
    queryLimit: process.env.MONGODB_QUERY_LIMIT,
    questionLimit: process.env.QUESTION_LIMIT
  },

  mongoErrorCode: {
    duplicateId: 11000
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE === 'true'
  }

};

