const Salary_Structure = require("../models/salary_structure_model");
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.create_salary_structure = async (req, res) => {
  const {
    employee,
    salary_type,
    earnings,
    reimbursements,
    deductions,
    month,
  } = req.body;

  if (!employee) {
    return res.status(422).json({
      error: "Employee is required",
    });
  }

  if (!salary_type) {
    return res.status(422).json({
      error: "Salary type is required",
    });
  }

  try {
    await Salary_Structure({
      employee,
      salary_type,
      earnings,
      reimbursements,
      deductions,
      month,
    }).save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json({
        message: "Salary structure created successfully",
        result,
      });
    });
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
};

module.exports.get_salary_structure = async (req, res) => {
  const { employee } = req.params;
  try {
    await Salary_Structure.find({ employee: employee || req.user._id })
      .populate("employee", "employee_id full_name role designation")
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json(result[0]);
      });
  } catch (e) {
    res.status(400).json({
      error: errorHandler(e),
    });
  }
};

module.exports.get_all_accounts = (req, res) => {
  Salary_Structure.find()
    .populate({
      path: "employee",
      model: "Salary_Structure",
      select: "employee_id full_name role designation",
    })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

// module.exports.update_salary_structure = () => {};
