const Quotation = require("../models/Quotation");

exports.createQuotation = async (req, res) => {
  try {
    const {
      tenderId,
      customerId,
      quoteAmount,
      quoteDate,
      items,
      tax,
      delivery,
      warranty,
      coOrigin,
      principal,
      paymentTerms,
      approvedBy,
      oemSpecification,
      mode,
      modeOtherText,
      quoteValidityDays,
      unitPriceMultiplier,
      currencyUnit
    } = req.body;

    const userId = req.user.userId;

    // Auto-generate quoteNo (QT-xxxxx/yyyy)
    const year = new Date().getFullYear();
    const prefix = 'QT';
    const lastQuote = await Quotation.findOne({
      quoteNo: { $regex: `^${prefix}-\\d+/` + year }
    }).sort({ createdAt: -1 });

    let nextNumber = 101;
    if (lastQuote) {
      const match = lastQuote.quoteNo.match(/-(\d+)\/\d+/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    const paddedNumber = String(nextNumber).padStart(5, '0');
    const quoteNo = `${prefix}-${paddedNumber}/${year}`;

    // Calculate totals
    // const subTotal = items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
    // const taxAmount = subTotal * parseFloat(tax || 0);
    // const grandTotal = subTotal + taxAmount;
      const subTotal = items.reduce((acc, item) => acc + item.qty * item.unitPrice * (unitPriceMultiplier || 1), 0);
      const taxAmount = subTotal * parseFloat(tax || 0);
      const grandTotal = subTotal + taxAmount;

    const quotation = new Quotation({
      tenderId,
      userId,
      customerId,
      quoteAmount,
      quoteDate,
      quoteNo,
      items,
      subTotal,
      tax,
      grandTotal,
      delivery,
      warranty,
      coOrigin,
      principal,
      paymentTerms,
      approvedBy,
      oemSpecification,
      mode,
      modeOtherText,
      quoteValidityDays,
      unitPriceMultiplier,
      currencyUnit
    });

    await quotation.save();
    res.status(201).json(quotation);
  } catch (error) {
    console.error("Quotation creation failed:", error);
    res.status(500).json({ error: "Failed to create quotation", details: error.message });
  }
};

exports.getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate("tenderId")
      .populate("userId")
      .populate("customerId");

    if (!quotation) return res.status(404).json({ error: "Quotation not found" });

    res.status(200).json(quotation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .populate("tenderId")
      .populate("userId")
      .populate("customerId")
      .sort({ createdAt: -1 });

    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (updates.items) {
      updates.subTotal = updates.items.reduce((acc, item) => acc + item.qty * item.unitPrice * (updates.unitPriceMultiplier || 1), 0);
      updates.grandTotal = updates.subTotal + updates.subTotal* parseFloat(updates.tax || 0);
    }

    const updated = await Quotation.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) return res.status(404).json({ error: "Quotation not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Quotation.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Quotation not found" });

    res.status(200).json({ message: "Quotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
