require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const tenderRoutes = require("./routes/tenderRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require('./routes/customerRoutes')
const vendorRoutes = require('./routes/vendorRoutes')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use("/api", userRoutes);
app.use("/api", tenderRoutes);
app.use("/api", quotationRoutes);
app.use("/api", purchaseOrderRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", customerRoutes);
app.use("/api", vendorRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});