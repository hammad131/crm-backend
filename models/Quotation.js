const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  sNo: Number,
  refNo:Number,
  item: String,
  qty: Number,
  unitPrice: Number,
});

const quotationSchema = new mongoose.Schema({
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: "Tender", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  quoteAmount: { type: Number, required: true },
  quoteDate: { type: Date, required: true },
  quoteNo: { type: String, required: true, unique: true },
  subTotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  items: [itemSchema],

  // Additional fields
  delivery: { type: String },
  warranty: { type: String },
  coOrigin: [{ type: String }],          // List of countries of origin
  principal: [{ type: String }],         // List of principal names
  paymentTerms: { type: String },
  approvedBy: { type: String },
  oemSpecification: { type: String }, // file upload to cloudinary
  mode: { type: String, enum: ["F.O.R", "C&F", "Other"], default: "F.O.R" },
  modeOtherText: { type: String },
  quoteValidityDays: { type: Number },
  unitPriceMultiplier: { type: Number },
  currencyUnit: { type: String },
},
{
  timestamps: true
});

// quotationSchema.pre('save', async function (next) {
//   if (this.quoteNo) {
//     return next(); // Already set manually
//   }

//   const year = new Date().getFullYear();
//   const prefix = 'QT';

//   // Find the latest quote for this year
//   const lastQuote = await mongoose.model('Quotation').findOne({
//     quoteNo: { $regex: `^${prefix}-\\d+/` + year }
//   }).sort({ createdAt: -1 });

//   let nextNumber = 101;
//   if (lastQuote) {
//     const match = lastQuote.quoteNo.match(/-(\d+)\/\d+/);
//     if (match && match[1]) {
//       nextNumber = parseInt(match[1], 10) + 1;
//     }
//   }

//   const paddedNumber = String(nextNumber).padStart(5, '0'); // QT-00101
//   this.quoteNo = `${prefix}-${paddedNumber}/${year}`;
//   next();
// });

module.exports = mongoose.model("Quotation", quotationSchema);
