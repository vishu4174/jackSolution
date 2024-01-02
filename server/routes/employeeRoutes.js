const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const validateToken = require("../helpers/tokenValidate");

router.get("/", validateToken, employeeController.getAllEmployees);
router.post("/", validateToken, employeeController.createEmployee);
router.post("/filter", validateToken, employeeController.filterEmployee);
router.get("/:id", validateToken, employeeController.getEmployeeById);
router.put("/:id", validateToken, employeeController.updateEmployee);
router.delete("/:id", validateToken, employeeController.deleteEmployee);

module.exports = router;
