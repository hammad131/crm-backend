const express = require("express");
const customerController = require("../controllers/customerController");
const { isAdmin, authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Only admin can update or delete customers
router.put("/customers/:id", authenticate, isAdmin, customerController.updateCustomer);
router.delete("/customers/:id", authenticate, isAdmin, customerController.deleteCustomer);

// All authenticated users can create and view customers
router.post("/customers", authenticate, customerController.createCustomer);
router.get("/customers", authenticate, customerController.getAllCustomers);
router.get("/customers/:id", authenticate, customerController.getCustomer);

module.exports = router;
