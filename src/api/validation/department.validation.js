/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/
const { Joi, CV } = require(`${global.appRoot}/src/api/providers/joi.validator`);
module.exports = {

    // POST /v1/department
    createDepartment: {
        body: Joi.object({
            name: Joi.string().max(50).required(),
        }),
    },
    // PATCH /v1/department/:departmentId
    updateDepartment: {
        body: Joi.object({
            name: Joi.string().max(50).required(),
        }),
        params: Joi.object({
            departmentId: CV.th().objectId().required(),
        }),
    },
    // GET  /v1/department/list
    departmentListing: {
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

    // GET /v1/department/:departmentId/change-status
    changeDepartmentStatus: {
        body: Joi.object({
            status: Joi.boolean().required(),
        }),
        params: Joi.object({
            departmentId: CV.th().objectId().required(),
        }),
    },
    // DELETE  /v1/department/:departmentId
    deleteDepartment: {
        params: Joi.object({
            departmentId: CV.th().objectId().required(),
        }),
    },
};
