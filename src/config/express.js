const express = require('express');
// const multer = require('multer');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const helmet = require('helmet');
const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const error = require('../api/middlewares/error');
const pagination = require('../api/middlewares/pagination');
const response = require('./response');

const swaggerDocument = require(`${global.appRoot}/swagger/swagger.json`);
const customCss = fs.readFileSync(`${global.appRoot}/swagger/swagger.css`, 'utf8');

const Response = new response(); // eslint-disable-line

/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
// parse application/json
// app.use(bodyParser({ defer: true }));
// app.use(bodyParser.json({ limit: '20mb', strict: true }));
// app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 1000 }));
app.use(bodyParser.json({ limit: '500mb' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(pagination);

app.use('/api-docs', swaggerUi.serveFiles(swaggerDocument, {}), swaggerUi.setup(swaggerDocument, { customCss }));

// bind response wrapper
app.use(Response.handler());

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
