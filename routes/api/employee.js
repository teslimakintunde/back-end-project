import express from "express";
import { createEmployee } from "../../controllers/employee.js";
const router = express.Router();

router.post("/", createEmployee);

export default router;
