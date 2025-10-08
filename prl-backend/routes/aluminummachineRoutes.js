const express = require("express");
const {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
  getMachineByCode,
} = require("../controllers/aluminummachineController");

const router = express.Router();

// CRUD Routes
router.post("/", createMachine); // Add new machine
router.get("/", getMachines); // Get all machines
router.get("/code/:code", getMachineByCode); // Get machine by code
router.get("/:id", getMachineById); // Get machine by id
router.put("/:id", updateMachine); // Update machine by id
router.delete("/:id", deleteMachine); // Delete machine by id

module.exports = router;