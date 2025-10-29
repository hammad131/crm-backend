const PurchaseOrder = require("../models/PurchaseOrder");

async function generateNextPONumber() {
  const year = new Date().getFullYear();
  const lastPO = await PurchaseOrder.findOne({ poNumber: { $regex: `/${year}$` } })
    .sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastPO) {
    const lastNumber = parseInt(lastPO.poNumber.split('-')[1].split('/')[0]);
    nextNumber = lastNumber + 1;
  }

  return `PO-${String(nextNumber).padStart(5, '0')}/${year}`;
}

exports.createPurchaseOrder = async (req, res) => {
  try {
    const {
      poDate,
      vendorId,
      clientRefNo,
      clientOrderNo,
      mode,
      shipTo,
      shippingTerms,
      shippingMethod,
      deliveryDate,
      items,
      destination,
      currencyUnit,
      deliveryTerms,
      paymentTerms,
      warranty,
      notes
    } = req.body;

    const userId = req.user.userId;

    if (!["C&F", "F.O.R"].includes(mode)) {
      return res.status(400).json({ error: "Invalid mode. Must be 'C&F' or 'F.O.R'." });
    }

    const validPayments = [
      "100% via Irrevocable L/c at sight",
      "50% advanced & 50% at the time of delivery",
      "100% after delivery"
    ];
    if (!validPayments.includes(paymentTerms)) {
      return res.status(400).json({ error: "Invalid payment terms." });
    }

    const subTotal = items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
    const itemsWithTotal = items.map(item => ({
      ...item,
      totalPrice: item.qty * item.unitPrice,
    }));
    const grandTotal = subTotal;

    const poNumber = await generateNextPONumber();

    const po = new PurchaseOrder({
      poNumber,
      poDate,
      userId,
      vendorId,
      clientRefNo,
      clientOrderNo,
      mode,
      shipTo,
      shippingTerms,
      shippingMethod,
      deliveryDate,
      items: itemsWithTotal,
      destination,
      currencyUnit,
      subTotal,
      grandTotal,
      deliveryTerms,
      paymentTerms,
      warranty,
      notes
    });

    await po.save();

    res.status(201).json(po);
  } catch (error) {
    console.error("Purchase Order creation failed:", error);
    res.status(500).json({ error: "Failed to create Purchase Order", details: error.message });
  }
};

exports.getPurchaseOrder = async (req, res) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id)
      .populate("userId")
      .populate("vendorId")
      .populate("clientRefNo")
      

    if (!po) return res.status(404).json({ error: "Purchase Order not found" });

    res.status(200).json(po);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const pos = await PurchaseOrder.find()
      .populate("userId")
      .populate("vendorId")
      .populate("clientRefNo")
      .sort({ createdAt: -1 });

    res.status(200).json(pos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePurchaseOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.poNumber) delete updates.poNumber;

    if (updates.mode && !["C&F", "F.O.R"].includes(updates.mode)) {
      return res.status(400).json({ error: "Invalid mode. Must be 'C&F' or 'F.O.R'." });
    }

    const validPayments = [
      "100% via Irrevocable L/c at sight",
      "50% advanced & 50% at the time of delivery",
      "100% after delivery"
    ];
    if (updates.paymentTerms && !validPayments.includes(updates.paymentTerms)) {
      return res.status(400).json({ error: "Invalid payment terms." });
    }

    if (updates.items) {
      const subTotal = updates.items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
      const itemsWithTotal = updates.items.map(item => ({
        ...item,
        totalPrice: item.qty * item.unitPrice,
      }));
      updates.items = itemsWithTotal;
      updates.subTotal = subTotal;
      updates.grandTotal = subTotal;
    }

    const updated = await PurchaseOrder.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) return res.status(404).json({ error: "Purchase Order not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PurchaseOrder.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Purchase Order not found" });

    res.status(200).json({ message: "Purchase Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
