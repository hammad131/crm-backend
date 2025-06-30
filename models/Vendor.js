const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactPerson: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  zipCode: { type: String },
  ntn: { type: String }, // Tax identification number
  remarks: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);
