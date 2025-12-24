// routes/upvcMachineRoutes.js (या जो भी आपकी फाइल का नाम है)
const express = require("express");
const router = express.Router();
const controller = require("../controllers/upvcmachineController");

// ============================================================================
// LOGIC NOTE: identifier param ka use controller mein custom 'id', 'code' 
// aur '_id' teeno ko search karne ke liye kiya jayega.
// ============================================================================

// File upload route
router.post("/upload", controller.uploadFiles, controller.handleFileUpload);

// Create new machine
router.post("/", controller.createMachine);

// Get all machines
router.get("/", controller.getMachines);

// Get one machine (Ab ye custom string ID se fetch karega)
router.get("/:identifier", controller.getMachine);

// Update machine
router.put("/:identifier", controller.updateMachine);

// Delete machine
router.delete("/:identifier", controller.deleteMachine);

module.exports = router;