const express = require("express");
const router= express.Router();
const {handleCustomerExport, handleEmployeeExport}= require("../controllers/exportController");

router.get("/exportcustomers", handleCustomerExport);
router.get("/exportemployees", handleEmployeeExport);

module.exports = router;