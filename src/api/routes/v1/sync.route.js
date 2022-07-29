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
const mqSyncController = require(`${global.appRoot}/src/api/controllers/v1/mqSync.controller`);

/*
|----------------------------
| Define Routes
|----------------------------
|
|
*/
// Get Check
// METHOD : GET
// URL 	  : /v1/sync/list
router.route('/list').get(mqSyncController.list);

// Get Check
// METHOD : GET
// URL 	  : /v1/sync/sync-with-mqcenter
router.route('/sync-with-mqcenter').get(mqSyncController.sync_with_mqcenter);

// Get Check
// METHOD : GET
// URL 	  : /v1/sync/sync-available
router.route('/sync-available').get(mqSyncController.sync_available);

/*
|----------------------------
| Export Module
|----------------------------
|
|
*/
module.exports = router;
