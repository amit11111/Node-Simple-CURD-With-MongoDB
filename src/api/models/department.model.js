/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const httpStatus = require('http-status');

const { search } = require(`${global.appRoot}/src/api/helpers/app.helper`);
const APIError = require(`${global.appRoot}/src/api/errors/api-error.js`);

/**
 * department Schema
 * @private
 */
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

/**
* Methods
*/
departmentSchema.method({
  transform() {
    const transformed = {};
    const fields = ['name'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

/**
 * Statics
 */
departmentSchema.statics = {
  /**
* Get Promotion
*
* @param {ObjectId} id - The objectId of department.
* @returns {Promise<department, APIError>}
*/
  async get(id) {
    let department;
    if (mongoose.departments.ObjectId.isValid(id)) {
      department = await this.findById(id).exec();
    }
    if (department) {
      return test;
    }
    throw new APIError({
      message: 'department does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },
  /**
   *
   * @param {number} skip - Number of department to be skipped.
   * @param {number} limit - Limit number of department to be returned.
   * @returns {Promise<department[]>}
   */
  list(req) {
    let listData = this;

    const query = {};
    const sort = {};

    let sort_field = 'createdAt'; // No name or tile Column then set CreatedAt
    let sort_with = -1;

    if (req._sort) {
      // eslint-disable-next-line no-unused-vars
      sort_field = req._sort.filed;
      sort_with = req._sort.sort;
    }

    if (req._search) {
      query.name = search(req._search);
    }

    sort[sort_field] = sort_with;
    if (req._pagination) {
      const { page, limit } = req._pagination;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
      };

      if (sort) {
        options.sort = sort;
      }

      listData = listData.paginate(query, options);
    } else {
      listData = listData.find(query).sort(sort);
    }

    return listData;
  },
};

departmentSchema.plugin(mongoosePaginate);

/**
 * @departmentdef department
 */
module.exports = mongoose.model('department', departmentSchema);
