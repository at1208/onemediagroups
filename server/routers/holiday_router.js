const express = require("express");
const router = express.Router();

const { create_holiday,
        update_holiday,
        delete_holiday,
        all_holiday,
        single_holiday
      } = require("../controllers/holiday_controller");

router.post("/create/holiday", create_holiday);
router.patch("/update/holiday/:_id", update_holiday);
router.patch("/delete/holiday/:_id", delete_holiday);
router.get("/all/holiday", all_holiday);
router.get("/single/holiday/:_id", single_holiday);

module.exports = router;
