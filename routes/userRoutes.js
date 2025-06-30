const express = require("express");
const userController = require("../controllers/userController");
const { isAdmin,authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Only admin can create users
router.post("/users", userController.createUser);

// Only admin can update or delete users
router.put("/users/:id", authenticate,isAdmin, userController.updateUser);
router.delete("/users/:id",authenticate,isAdmin, userController.deleteUser);

// All users can view their own profile
router.get("/users/:id",authenticate, userController.getUser);

module.exports = router;