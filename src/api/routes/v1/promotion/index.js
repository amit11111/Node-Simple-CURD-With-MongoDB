/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/

const express = require('express');

const router = express.Router();

/*
|----------------------------
| Import Route Modules
|----------------------------
|
|
*/
const TypeRoutes = require('./type.routes');

/*
|----------------------------
| Import Route Here
|----------------------------
|
|
*/

// Bind Type Module End Points
// URL : /v1/promotion/type
router.use('/type', TypeRoutes);

/*
|----------------------------
| Export Module
|----------------------------
|
|
*/
module.exports = router;
