const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  sNo: Number,
  description: String,
  qty: Number,
  unitPrice: Number,
  gst: Number, // GST amount per item
  totalWithTax: Number, // calculated field: (qty * unitPrice) + gst
});

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true, unique: true }, // auto generated at backend
  billNo: { type: String, unique: true }, // auto generated at backend

  invoiceDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },

  orderReference: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation", required: true }, 
  items: [invoiceItemSchema],

  subTotal: { type: Number, required: true },
  totalGST: { type: Number, required: true },
  grandTotal: { type: Number, required: true },

  amountInWords: { type: String },// auto generated at backend
  forCompany: { type: String },
  paymentInstructions: { 
    type: String, 
    default: "Make all checks payable to M/S. PAKTECH INSTRUMENTS COMPANY" 
  },

  status: { 
    type: String, 
    enum: ["Paid", "Not Paid", "Partially Paid"], 
    default: "Not Paid" 
  } // New: Payment status

}, { 
  timestamps: true 
});

module.exports = mongoose.model("Invoice", invoiceSchema);
