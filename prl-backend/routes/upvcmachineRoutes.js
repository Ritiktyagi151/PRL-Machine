const express = require("express");
const router = express.Router();
const controller = require("../controllers/upvcmachineController");
const upload = require("../middlewares/upload"); // Centralized Multer Middleware

// 🔹 Single file upload logic for consistency
router.post("/upload", upload.single("file"), controller.handleFileUpload);

router.post("/", controller.createMachine);
router.get("/", controller.getMachines);
router.get("/:identifier", controller.getMachine);
router.put("/:identifier", controller.updateMachine);
router.delete("/:identifier", controller.deleteMachine);

module.exports = router;
