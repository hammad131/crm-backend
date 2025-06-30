const Tender = require("../models/Tender");

// Create a new Tender
exports.createTender = async (req, res) => {
  try {
    const {
      title,
      description,
      customerId,
      publishedOn,
      preBidMeeting,
      dueDate,
      contractDate,
      openingTimeAndVenue,
      singleStage,
      twoStageTechnicalOpeningTimeAndDate,
      twoStageFinancialOpeningTimeAndDate,
      endUserQuery,
      bidEvaluationReport,
      ordersAwarded,
      ordersPlaced,
      contractAgreements,
      performanceGuarantee,
      performanceGuaranteeOtherText,
      performanceGuaranteeReleased,
      shippingTimeAndDate,
      deliveryTimeAndDate,
      inspectionTimeAndDate,
      installationTrainingCompletion,
      installationTrainingReport,
      billStatus,
      billUrl,
      modeOfDelivery,
      modeOfDeliveryOtherText,
      earnestMoney,
      earnestMoneyAmount,
      performanceGuaranteeImage,
      items,
      totalAmountQuoted,
      numItemsAwarded,
      awardedAmount,
      stampDuty,
      expectedShipmentDate,
      extensionLetterImage,
      extensionStatus,
      extendedDeliveryDate,
      lateDeliveryCharges,
      projectStatus,
      focalPersonInfo,
      inchargeAtPaktech
    } = req.body;

    const userId = req.user.userId;

    const tender = new Tender({
      title,
      description,
      user: userId,
      customerId,
      publishedOn,
      preBidMeeting,
      dueDate,
      contractDate,
      openingTimeAndVenue,
      singleStage,
      twoStageTechnicalOpeningTimeAndDate,
      twoStageFinancialOpeningTimeAndDate,
      endUserQuery,
      bidEvaluationReport,
      ordersAwarded,
      ordersPlaced,
      contractAgreements,
      performanceGuarantee,
      performanceGuaranteeOtherText,
      performanceGuaranteeReleased,
      shippingTimeAndDate,
      deliveryTimeAndDate,
      inspectionTimeAndDate,
      installationTrainingCompletion,
      installationTrainingReport,
      billStatus,
      billUrl,
      modeOfDelivery,
      modeOfDeliveryOtherText,
      earnestMoney,
      earnestMoneyAmount,
      performanceGuaranteeImage,
      items,
      totalAmountQuoted,
      numItemsAwarded,
      awardedAmount,
      stampDuty,
      expectedShipmentDate,
      extensionLetterImage,
      extensionStatus,
      extendedDeliveryDate,
      lateDeliveryCharges,
      projectStatus,
      focalPersonInfo,
      inchargeAtPaktech
    });

    await tender.save();
    res.status(201).json(tender);
  } catch (error) {
    console.error("Error creating tender:", error);
    res.status(500).json({ error: "Tender creation failed.", details: error.message });
  }
};

// Get Tender by ID
exports.getTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id)
      .populate("user")
      .populate("customerId");

    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    res.status(200).json(tender);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Tenders
exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.find()
      .populate("user")
      .populate("customerId")
      .sort({ createdAt: -1 });

    res.status(200).json(tenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Tender
exports.updateTender = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const tender = await Tender.findByIdAndUpdate(id, updates, { new: true });

    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    res.status(200).json(tender);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Tender
exports.deleteTender = async (req, res) => {
  try {
    const { id } = req.params;

    const tender = await Tender.findByIdAndDelete(id);

    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    res.status(200).json({ message: "Tender deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
