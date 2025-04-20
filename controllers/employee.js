const EmployeeData = require("../models/Employee");

const createEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname)
    return res.status(400).json({ message: "missing required field" });
  try {
    const employeeExist = await EmployeeData.findOne({ firstname });
    if (employeeExist) {
      return res.status(400).json({ message: "Employee exist" });
    }
    const newEmployee = await EmployeeData.create({
      firstname,
      lastname,
    });
    res.status(200).json(newEmployee);
  } catch (error) {
    console.log(error);
  }
};
const getAllEmployee = async (req, res) => {
  try {
    const allEmployees = await EmployeeData.find();
    res.status(201).json(allEmployees);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createEmployee, getAllEmployee };
