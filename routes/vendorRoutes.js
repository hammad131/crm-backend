const express = require("express");
const vendorController = require("../controllers/vendorController");
const { isAdmin, authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Only admin can create, update, or delete vendors
router.post("/vendors", authenticate,  vendorController.createVendor);
router.put("/vendors/:id", authenticate, isAdmin, vendorController.updateVendor);
router.delete("/vendors/:id", authenticate, isAdmin, vendorController.deleteVendor);

// All authenticated users can view vendors
router.get("/vendors/:id", authenticate, vendorController.getVendor);
router.get("/vendors", authenticate, vendorController.getAllVendors);

module.exports = router;
