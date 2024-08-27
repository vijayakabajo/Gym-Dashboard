const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    assignedEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    plan: {
      type: String,
      enum: [
        "per day",
        "1 month",
        "3 months",
        "6 months",
        "12 months",
      ],
      required: true,
    },
    sessionType: {
      type: String,
      enum: [
        "1 session",
        "12 sessions",
        "24 sessions",
        "12 sessions (couple)",
        "24 sessions (couple)",
      ],
    },
    status: {
      type: String,
      enum: ["active", "freeze", "transferred"],
      default: "active",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    debt: {
      type: Number,
      default: function () {
        return this.totalAmount - this.amountPaid;
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
