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
| Import controllers
|----------------------------
|
|
*/
const DemoController = require(`${global.appRoot}/src/api/controllers/v1/demo.controller`);

/*
|----------------------------
| Define Routes
|----------------------------
|
|
*/
// Get Check
// METHOD : GET
// URL 	  : /v1/demo/list
router.route('/list').get(DemoController.list);

// Get Check
// METHOD : GET
// URL 	  : /v1/demo/check
router.route('/check').get(DemoController.check);

/*
|----------------------------
| Export Module
|----------------------------
|
|
*/
module.exports = router;
