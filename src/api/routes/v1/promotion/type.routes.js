/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/

const express = require('express');

const router = express.Router();

const validate = require(`${global.appRoot}/src/api/middlewares/validation`);

const checkRole = require(`${global.appRoot}/src/api/middlewares/checkRole`);

/*
|----------------------------
| Import controllers
|----------------------------
|
|
*/
const TypeController = require(`${global.appRoot}/src/api/controllers/v1/promotion/type.controller`);
/*
|----------------------------
| Import validations
|----------------------------
|
|
*/
const {
    typeListing,
    createType,
    updateType,
    changeTypeStatus,
    deleteType,
} = require(`${global.appRoot}/src/api/validation/promotion/type.validation`);

/*
|----------------------------
| Define Routes
|----------------------------
|
|
*/
// Get type list
// METHOD : GET
// URL 	  : /v1/promotion/type/list
router.route('/list').get(validate(typeListing), checkRole(['admin']), TypeController.list);

// Create type
// METHOD : POST
// URL 	  : /v1/promotion/type
router.route('/').post(validate(createType), checkRole(['admin']), TypeController.create);

// Update type
// METHOD : PUT
// URL 	  : /v1/promotion/type/:typeId
router.route('/:typeId').put(validate(updateType), checkRole(['admin']), TypeController.update);

// GET Test
// METHOD : PUT
// URL 	  : /v1/promotion/type/:typeId/change-status
router.route('/:typeId/change-status').put(validate(changeTypeStatus), checkRole(['admin']), TypeController.changeStatus);

// DELETE Test
// METHOD : DELETE
// URL 	  : /v1/promotion/type/:typeId
router.route('/:typeId').delete(validate(deleteType), checkRole(['admin']), TypeController.delete);

/*
|----------------------------
| Export Module
|----------------------------
|
|
*/
module.exports = router;
