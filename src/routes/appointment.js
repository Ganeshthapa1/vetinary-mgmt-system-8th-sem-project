const express = require("express");
const {
  createPublicAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

// Public route for booking an appointment
router.route("/").post(createPublicAppointment);

module.exports = router;
