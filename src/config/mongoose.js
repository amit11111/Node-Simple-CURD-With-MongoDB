const mongoose = require('mongoose');
const logger = require('./logger');
const { mongoDBConnections, env } = require('./vars');

const {
  searchArrayObject,
} = require(`${global.appRoot}/src/api/helpers/arrayObject.helper`);

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = (name) => {
  if (mongoDBConnections.length > 0) {
    let get_conection = null;

    const option = {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    if (name) {
      get_conection = searchArrayObject('name', name, mongoDBConnections);
      if (get_conection) {
        return mongoose.createConnection(get_conection.uri, option);
      }
    }

    // Set Default Connection
    get_conection = searchArrayObject('default', true, mongoDBConnections);

    if (get_conection) {
      mongoose
        .connect(get_conection.uri, {
          useCreateIndex: true,
          keepAlive: 1,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        })
        .then(() => console.log(`${get_conection.name} : MongoDB Connected...`)); // eslint-disable-line
    }
  }
  return null;
};
