const express = require("express");
const router = express.Router();

const { create_event,
        update_event,
        delete_event,
        all_event,
        single_event
      } = require("../controllers/event_controller");


const { create_event_validator } = require('../validators/event_validator');
const { run_validation }  = require('../validators/index');

router.post("/create/event", create_event_validator, run_validation, create_event);
router.patch("/update/event/:_id", update_event);
router.patch("/delete/event/:_id", delete_event);
router.get("/all/event", all_event);
router.get("/single/event/:_id", single_event);

module.exports = router;
