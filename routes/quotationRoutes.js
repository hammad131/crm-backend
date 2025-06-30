const express = require("express");
const quotationController = require("../controllers/quotationController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin routes
router.put("/quotations/:id", authenticate, isAdmin, quotationController.updateQuotation);
router.delete("/quotations/:id", authenticate, isAdmin, quotationController.deleteQuotation);

// All authenticated users
router.post("/quotations", authenticate, quotationController.createQuotation);
router.get("/quotations", authenticate, quotationController.getAllQuotations);
router.get("/quotations/:id", authenticate, quotationController.getQuotation);

module.exports = router;
