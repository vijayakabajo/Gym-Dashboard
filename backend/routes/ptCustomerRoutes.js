const express =require("express");
const router = express.Router();
const {getAllSessionCustomers} = require("../controllers/ptCustomerController")


router.get("/", getAllSessionCustomers);

module.exports = router;