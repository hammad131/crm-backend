const express = require("express");
const tenderController = require("../controllers/tenderController");
const { isAdmin, authenticate } = require("../middleware/authMiddleware");
const  upload  = require("../middleware/upload");

const router = express.Router();

// // Only admin can update or delete tenders
router.put("/tenders/:id",authenticate, isAdmin, tenderController.updateTender);
router.delete("/tenders/:id",authenticate, isAdmin, tenderController.deleteTender);

// All users can create and view tenders
router.post("/tenders",authenticate, upload, tenderController.createTender);
router.get("/tenders",authenticate, tenderController.getAllTenders);
router.get("/tenders/:id",authenticate, tenderController.getTender);

module.exports = router;