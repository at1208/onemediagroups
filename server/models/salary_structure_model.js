const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// const SchemaTypes = mongoose.Schema.Types;
const salaryStructureSchema = new mongoose.Schema(
  {
    employee: {
      type: ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },
    salary_type: {
      type: String,
      enum: ["FIXED", "VARIABLE"],
      default: "FIXED",
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salary_Structure", salaryStructureSchema);
