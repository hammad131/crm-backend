const express = require("express");
const purchaseOrderController = require("../controllers/purchaseOrderController");
const { isAdmin,authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Only admin can update or delete purchase orders
router.put("/purchase-orders/:id",authenticate, isAdmin, purchaseOrderController.updatePurchaseOrder);
router.delete("/purchase-orders/:id",authenticate, isAdmin, purchaseOrderController.deletePurchaseOrder);

// All users can create and view purchase orders
router.post("/purchase-orders",authenticate, purchaseOrderController.createPurchaseOrder);
router.get("/purchase-orders",authenticate, purchaseOrderController.getAllPurchaseOrders);
router.get("/purchase-orders/:id",authenticate, purchaseOrderController.getPurchaseOrder);

module.exports = router;