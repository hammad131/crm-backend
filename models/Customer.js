const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
 name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, unique: true },

  universityName: { type: String },
  universityPrefix: { type: String }, // e.g., NEDUET, UET, PU
  departmentName: { type: String },
  departmentPrefix: { type: String }, // e.g., EE, ME, CSE
},
{
  timestamps: true
});

module.exports = mongoose.model("Customer", customerSchema);
