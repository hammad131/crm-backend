const express = require("express");
const invoiceController = require("../controllers/invoiceController");
const { isAdmin,authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Only admin can update or delete invoices
router.put("/invoices/:id",authenticate, isAdmin, invoiceController.updateInvoice);
router.delete("/invoices/:id",authenticate, isAdmin, invoiceController.deleteInvoice);

// All users can create and view invoices
router.post("/invoices",authenticate, invoiceController.createInvoice);
router.get("/invoices",authenticate, invoiceController.getAllInvoices);
router.get("/invoices/:id",authenticate, invoiceController.getInvoice);

module.exports = router;