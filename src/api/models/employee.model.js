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
 * employee Schema
 * @private
 */
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
  },
  salary: {
    type: Number,
    default: null,
  },
  jod: {
    type: Date,
    default: null,
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
employeeSchema.method({
  transform() {
    const transformed = {};
    const fields = [];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

/**
 * Statics
 */
employeeSchema.statics = {
  /**
* Get Promotion
*
* @param {ObjectId} id - The objectId of employee.
* @returns {Promise<employee, APIError>}
*/
  async get(id) {
    let employee;
    if (mongoose.employees.ObjectId.isValid(id)) {
      employee = await this.findById(id).exec();
    }
    if (employee) {
      return test;
    }
    throw new APIError({
      message: 'employee does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },
  /**
   *
   * @param {number} skip - Number of employee to be skipped.
   * @param {number} limit - Limit number of employee to be returned.
   * @returns {Promise<employee[]>}
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

      options.populate = [
        {
          path: 'department',
          select: {
            _id: 1,
            name: 1,
            status: 1,
          },
        },
      ];

      listData = listData.paginate(query, options);
    } else {
      listData = listData.find(query).sort(sort).populate('department', { _id: 1, name: 1, status: 1 });
    }

    return listData;
  },
};

employeeSchema.plugin(mongoosePaginate);

/**
 * @employeedef employee
 */
module.exports = mongoose.model('employee', employeeSchema);
