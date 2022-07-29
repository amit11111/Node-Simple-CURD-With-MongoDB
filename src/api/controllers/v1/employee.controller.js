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
const Employee = require(`${global.appRoot}/src/api/models/employee.model`);

/**
 * Get Employee list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    // get List from Database
    const employeeData = await Employee.list(req);

    // Transform Data
    if (isObject(employeeData)) {
      // eslint-disable-next-line max-len
      employeeData.data = employeeData.docs;
      delete employeeData.docs;
    }

    // set response
    res.sendResponse(employeeData, 'Employee list data found sccessfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Create Employee
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    // create a Employee
    const employee = new Employee(req.body);
    await employee.save();

    // set response
    res.sendCreated(null, 'Employee inserted successfuly..');
  } catch (error) {
    next(error);
  }
};

/**
 * Get Employee
 * @public
 */
 exports.get = async (req, res, next) => {
  try {
    // Get the Employee data By Id
    const { employeeId } = req.params;

    const employee = await Employee.findOne({ _id: employeeId }).populate('department', { _id: 1, name: 1, status: 1 });

    // set response
    res.sendCreated(employee, 'Employee Details Get successfuly..');
  } catch (error) {
    next(error);
  }
};

/**
 * Update Employee
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    // update the Employee data By Id
    const id = req.params.employeeId;
    await Employee.findByIdAndUpdate(id, req.body, { new: true });
    // set response
    res.sendUpdated(null, 'Employee data update successfully');
  } catch (error) {
    next(error);
  }
};
/**
 * Change Status of Employee
 * @public
 */
exports.changeStatus = async (req, res, next) => {
  try {
    // update the Employee data By Id
    const id = req.params.employeeId;
    await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // set response
    res.sendUpdated(null, 'Employee Status Changed Successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Employee;
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    // delete Employee By Id
    await Employee.findByIdAndDelete(employeeId);
    // set response
    res.sendDeleted('', 'Employee deleted sccessfully');
  } catch (error) {
    next(error);
  }
};
