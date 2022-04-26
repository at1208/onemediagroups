const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const payslipSchema = new mongoose.Schema(
  {
    employee: {
      type: ObjectId,
      ref: "Employee",
      required: true,
    },
    salary_type: {
      type: String,
      enum: ["FIXED", "VARIABLE"],
      default: "FIXED",
    },
    earnings: [
      {
        earning_type: {
          type: String,
        },
        amount: {
          type: Number,
        },
      },
    ],
    reimbursements: [
      {
        reimbursement_type: {
          type: String,
        },
        amount: {
          type: Number,
        },
      },
    ],
    deductions: [
      {
        deduction_type: {
          type: String,
        },
        amount: {
          type: Number,
        },
      },
    ],
    month: {
      type: String,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payslip", payslipSchema);
