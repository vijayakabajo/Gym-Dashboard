const Customer = require("../models/customer");
const moment = require("moment");

// Get total amount collected by payment mode for the current month
exports.getMonthlyRevenueByPaymentMode = async (req, res) => {
  try {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    // Aggregate for cash and online payments
    const revenueData = await Customer.aggregate([
      {
        $match: {
          paymentMode: { $in: ["cash", "online"] },
          updatedAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$paymentMode",
          totalCollected: { $sum: "$amountPaid" },
        },
      },
    ]);

    const cashRevenue = revenueData.find((data) => data._id === "cash")?.totalCollected || 0;
    const onlineRevenue = revenueData.find((data) => data._id === "online")?.totalCollected || 0;

    res.status(200).json({
      cashRevenue,
      onlineRevenue,
    });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    res.status(500).json({ message: "Error fetching revenue data" });
  }
};
