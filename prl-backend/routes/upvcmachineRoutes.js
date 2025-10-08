const express = require("express");
const router = express.Router();
const controller = require("../controllers/upvcmachineController");

router.post("/upload", controller.uploadFiles, controller.handleFileUpload);
router.post("/", controller.createMachine);
router.get("/", controller.getMachines);
router.get("/:identifier", controller.getMachine);
router.put("/:identifier", controller.updateMachine);
router.delete("/:identifier", controller.deleteMachine);

module.exports = router;