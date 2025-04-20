const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
});

module.exports = mongoose.model("EmployeeData", employeeSchema);
