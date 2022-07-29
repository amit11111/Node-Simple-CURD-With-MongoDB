/* eslint-disable no-console */
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
global.appRoot = require('app-root-path');
// const cron = require('node-cron');
const schedule = require(`${global.appRoot}/src/api/schedule`);
const http = require('http');
const {
    port,
    env,
    // queue_receiver,
    schedule: schedule_run,
} = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

if (schedule_run) {
    // Schedule tasks to be run on the server.
    schedule.run();
}

// test travis
// open mongoose connection
mongoose.connect();

const httpServer = http.createServer(app);

httpServer.listen(port, async () => {
  console.log('\n------------------------------------------------------');
  console.log(`server started on port ${port} (${env})\n`);
  console.log(`Run URL : http://localhost:${port}\n`);
  console.log(`Mode : ${env}`);
  console.log('------------------------------------------------------\n');
  logger.info(`server started on port ${port} (${env})`);
});

/**
* Exports express
* @public
*/
module.exports = app;
