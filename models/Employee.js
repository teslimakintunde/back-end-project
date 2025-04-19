import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
});

const EmployeeData =
  mongoose.models.EmployeeData ||
  mongoose.model("EmployeeData", employeeSchema);
export default EmployeeData;
