/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/
const { Joi, CV } = require(`${global.appRoot}/src/api/providers/joi.validator`);
const moment = require('moment');

module.exports = {

    // POST /v1/employee
    createEmployee: {
        body: Joi.object({
            name: Joi.string().max(50).required(),
            department: CV.th().objectId().required(),
            salary: Joi.number().positive().required(),
            jod: Joi.date().max(moment().format('YYYY-MM-DD')).message({ 'date.max': 'date must be less than or equal to today' }).required(),
        }),
    },
    // PATCH /v1/employee/:employeeId
    updateEmployee: {
        body: Joi.object({
            name: Joi.string().max(50).required(),
            department: CV.th().objectId().required(),
            salary: Joi.number().positive().required(),
            jod: Joi.date().max(moment().format('YYYY-MM-DD')).message({ 'date.max': 'date must be less than or equal to today' }).required(),
        }),
        params: Joi.object({
            employeeId: CV.th().objectId().required(),
        }),
    },
    // GET  /v1/employee/list
    employeeListing: {
        query: Joi.object({
            page: Joi.number().integer(),
            limit: Joi.number().integer(),
            sort: Joi.object({
                field: Joi.string().max(30).required(),
                sort: Joi.string().max(30).required(),
            }),
            general_search: Joi.string().max(225),
            for_list_view: Joi.boolean(),
        }),
    },

    // GET /v1/employee/:employeeId
    getEmployee: {
        params: Joi.object({
            employeeId: CV.th().objectId().required(),
        }),
    },

    // PUT /v1/employee/:employeeId/change-status
    changeEmployeeStatus: {
        body: Joi.object({
            status: Joi.boolean().required(),
        }),
        params: Joi.object({
            employeeId: CV.th().objectId().required(),
        }),
    },

    // DELETE  /v1/employee/:employeeId
    deleteEmployee: {
        params: Joi.object({
            employeeId: CV.th().objectId().required(),
        }),
    },
};
