const express = require("express");
const router= express.Router();
const {handleCustomerExport, handleEmployeeExport}= require("../controllers/exportController");
const {handleCustomerWithSessionExport} = require("../controllers/exportController")

router.get("/exportcustomers", handleCustomerExport);
router.get("/exportemployees", handleEmployeeExport);
router.get("/exportcustomerwithpt", handleCustomerWithSessionExport);

module.exports = router;