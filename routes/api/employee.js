import express from "express";
import { createEmployee, getAllEmployee } from "../../controllers/employee.js";
const router = express.Router();

router.post("/", createEmployee);
router.get("/all", getAllEmployee);

export default router;
