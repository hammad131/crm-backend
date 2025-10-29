const mongoose = require("mongoose");

const poItemSchema = new mongoose.Schema({
  sNo: Number,
  description: String,
  qty: Number,
  unitPrice: Number,
  totalPrice: Number, // = qty * unitPrice
});

const purchaseOrderSchema = new mongoose.Schema({
 poNumber: { type: String, required: true, unique: true }, //auto generated

  poDate: { type: Date, required: true },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },

  clientRefNo: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation", required: true  },// Linked to Quotation
  clientOrderNo: { type: String }, 

  mode: { type: String, enum: ["C&F", "F.O.R"], required: true }, // Mode of shipment

  shipTo: {
    name: String,
    address: String,
    city: String,
    zip: String,
    phone: String,
    fax: String,
    email: String,
  },

  shippingTerms: { type: String },
  shippingMethod: { type: String }, // drop down to By air or By Sea or Both By Air and Sea
  deliveryDate: { type: Date },
  destination:{type: String},
  items: [poItemSchema],
  currencyUnit:{type: String},
  subTotal: { type: Number, required: true },
  grandTotal: { type: Number, required: true },

  deliveryTerms: { type: String, default: "12-16 weeks after confirmed order" },
  paymentTerms: { type: String, enum: [
    "100% via Irrevocable L/c at sight",
    "50% advanced & 50% at the time of delivery",
    "100% after delivery"
  ], required: true },

  warranty: { type: String, default: "The equipment shall be covered by a 12 Months warranty, commencing after two weeks from the date of delivery." },

  notes: { type: String, default: "We are highly anticipating this partnership and we’re looking forward to working with you." },

  importDutiesTaxes: { type: String, default: "Including all duties and Taxes, GST mentioned separately." },
  inspectionTerms: { type: String, default: "The Buyer shall inspect the equipment upon delivery and notify the Seller of any defects or discrepancies within five days." },
  forceMajeure: { type: String, default: "Paktech will not be liable for any failure to perform due to unforeseen circumstances beyond our control." },
  customsCompliance: { type: String, default: "The Buyer shall comply with all applicable customs regulations and provide necessary documentation if applicable." }

}, { timestamps: true });

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
