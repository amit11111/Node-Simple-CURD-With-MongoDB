/*
|----------------------------
| Import Base Lib
|----------------------------
|
|
*/
const { isObject } = require(`${global.appRoot}/src/api/helpers/arrayObject.helper`);

/*
|----------------------------
| Import Base Model
|----------------------------
|
|
*/
const Department = require(`${global.appRoot}/src/api/models/department.model`);

/**
 * Get Department list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    // get List from Database
    const departmentData = await Department.list(req);

    // Transform Data
    if (isObject(departmentData)) {
      // eslint-disable-next-line max-len
      departmentData.data = departmentData.docs;
      delete departmentData.docs;
    }

    // set response
    res.sendResponse(departmentData, 'Department list data found sccessfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Create Department
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    // create a Department
    const department = new Department(req.body);
    await department.save();

    // set response
    res.sendCreated(null, 'Department inserted successfuly..');
  } catch (error) {
    next(error);
  }
};
/**
 * Update Department
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    // update the Department data By Id
    const id = req.params.departmentId;
    await Department.findByIdAndUpdate(id, req.body, { new: true });
    // set response
    res.sendUpdated(null, 'Department data update successfully');
  } catch (error) {
    next(error);
  }
};
/**
 * Change Status of Department
 * @public
 */
exports.changeStatus = async (req, res, next) => {
  try {
    // update the Department data By Id
    const id = req.params.departmentId;
    await Department.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // set response
    res.sendUpdated(null, 'Department Status Changed Successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Department;
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const departmentId = req.params.departmentId;
    // delete Department By Id
    await Department.findByIdAndDelete(departmentId);
    // set response
    res.sendDeleted('', 'Department deleted sccessfully');
  } catch (error) {
    next(error);
  }
};
