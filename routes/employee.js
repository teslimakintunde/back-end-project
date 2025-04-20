const express = require("express");
const controller = require("../controllers/employee");
const router = express.Router();

router.post("/", controller.createEmployee);
router.get("/all", controller.getAllEmployee);

module.exports = router;
