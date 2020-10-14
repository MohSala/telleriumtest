require('dotenv').config()

const appName = 'API test';

export const config = {
  appName,
  secretKey: process.env.SECRET,
  server: {
    url: process.env.APP_URL,
    port: process.env.APP_PORT
  },
  baseUrl: process.env.BASE_URL,
  mongo: {
    connection: {
      host: process.env.MONGODB_HOST,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      port: process.env.MONGODB_PORT,
      dbProd: process.env.MONGODB_DATABASE_NAME
    },
    collections: {
      users: 'users',
      market: 'market'
    },
    queryLimit: process.env.MONGODB_QUERY_LIMIT,
    questionLimit: process.env.QUESTION_LIMIT
  },
  google: {
    geocode_api: process.env.GOOGLE_GEOCODE_API,
    api_key: process.env.GOOGLE_API_KEY
  },
  aws: {
    access_key: process.env.AWS_ACCESS_KEY,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET
  },
  mongoErrorCode: {
    duplicateId: 11000
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE === 'true'
  }

};

