let mongoDbConnection;

if (process.env.NODE_ENV === 'development') {
  mongoDbConnection = process.env.MONGO_URI_DEVELOPMENT;
} else if (process.env.NODE_ENV === 'staging') {
  mongoDbConnection = process.env.MONGO_URI_STAGING;
} else if (process.env.NODE_ENV === 'production') {
  mongoDbConnection = process.env.MONGO_URI_PRODUCTION;
} else if (process.env.NODE_ENV === 'test') {
  mongoDbConnection = process.env.MONGO_URI_TEST;
} else {
  mongoDbConnection = process.env.MONGO_URI_TEST;
}

module.exports = {
  mongoDbConnection,
};
