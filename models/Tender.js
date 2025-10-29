const mongoose = require('mongoose');

// Item subdocument schema
const itemSchema = new mongoose.Schema({
  sNo: { type: Number },
  itemName: { type: String },
  item: { type: String },
  tenderItemRef: { type: String },
  unitPrice: { type: Number },
  expectedDeliveryDate: { type: Date }
});

const TenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tenderNo :{ type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
    index: true
  },

  publishedOn: { type: Date },
  preBidMeeting: { type: Date },
  dueDate: { type: Date },
  contractDate: { type: Date },

  openingTimeAndVenue: { type: String },
  singleStage: {
    type: String,
    enum: ["Single Stage One Envelope", "Single Stage Two Envelope"],
    default: "Single Stage One Envelope"
  },
  twoStageTechnicalOpeningTimeAndDate: { type: Date },
  twoStageFinancialOpeningTimeAndDate: { type: Date },

  endUserQuery: { type: String },
  bidEvaluationReport: { type: String }, // PDF URL
  ordersAwarded: { type: String },
  ordersPlaced: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  contractAgreements: { type: String }, // PDF URL
  
  performanceGuarantee: {
    type: String,
    enum: ['NIL', 'Bank Guarantee', 'Pay Order', 'Other'],
    default: 'NIL'
  },
  performanceGuaranteeOtherText: { type: String }, // Shown when 'Other' is selected

  performanceGuaranteeReleased: {
    type: String,
    enum: ['NIL', 'Letter Submitted', 'Released'],
    default: 'NIL'
  },

  shippingTimeAndDate: { type: Date },
  deliveryTimeAndDate: { type: Date },
  inspectionTimeAndDate: { type: Date },
  installationTrainingCompletion: { type: Date },
  installationTrainingReport: { type: String }, // PDF URL

  billStatus: {
    type: String,
    enum: ['Submitted', 'Not Submitted', 'Bill Cleared'],
    default: 'Not Submitted'
  },
  billUrl: { type: String }, // PDF URL

  modeOfDelivery: {
    type: String,
    enum: ['FOR', 'C&F', 'Other'],
    default: 'FOR'
  },
  modeOfDeliveryOtherText: { type: String }, // Shown when 'Other' is selected

  earnestMoney: { type: String }, // PDF URL
  earnestMoneyAmount: { type: Number },
  performanceGuaranteeImage: { type: String }, // PDF URL

  items: [itemSchema],

  totalAmountQuoted: { type: Number },
  numItemsAwarded: { type: Number },
  awardedAmount: { type: Number },
  stampDuty: { type: Number },

  expectedShipmentDate: { type: Date },
  extensionLetterImage: { type: String }, // PDF URL
  extensionStatus: {
    type: String,
    enum: ['NIL', 'Extended', 'Not Extended', 'Pending'],
    default: 'Pending'
  },
  extendedDeliveryDate: { type: Date },
  lateDeliveryCharges: { type: Number },

  projectStatus: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Cancelled', 'On Hold'],
    default: 'Ongoing'
  },
  focalPersonInfo: { type: String },
  inchargeAtPaktech: { type: String }

}, {
  timestamps: true
});


module.exports = mongoose.model("Tender", TenderSchema);
