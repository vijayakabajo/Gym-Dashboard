const express = require("express");
const { getMonthlyRevenueByPaymentMode } = require("../controllers/revenue2");

const router = express.Router();

router.get("/monthly-revenue", getMonthlyRevenueByPaymentMode);

module.exports = router;
