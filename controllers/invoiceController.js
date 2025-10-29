const Invoice = require("../models/Invoice");
const numberToWords = require('number-to-words'); // or any words library (you can install via: npm install number-to-words)

// Auto-generate invoice number
async function generateNextInvoiceNo() {
  const year = new Date().getFullYear();
  const lastInvoice = await Invoice.findOne({ invoiceNo: { $regex: `/${year}$` } })
    .sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastInvoice) {
    const lastNumber = parseInt(lastInvoice.invoiceNo.split('-')[1].split('/')[0]);
    nextNumber = lastNumber + 1;
  }

  return `INV-${String(nextNumber).padStart(5, '0')}/${year}`;
}

// Auto-generate bill number
async function generateNextBillNo() {
  const year = new Date().getFullYear();
  const lastInvoice = await Invoice.findOne({ billNo: { $regex: `/${year}$` } })
    .sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastInvoice) {
    const lastNumber = parseInt(lastInvoice.billNo.split('-')[1].split('/')[0]);
    nextNumber = lastNumber + 1;
  }

  return `BL-${String(nextNumber).padStart(5, '0')}/${year}`;
}

exports.createInvoice = async (req, res) => {
  try {
    const {
      invoiceDate,
      customerId,
      orderReference,
      forCompany,
      items,
      paymentInstructions,
      status
    } = req.body;

    const userId = req.user.userId;

    const subTotal = items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
    const totalGST = items.reduce((acc, item) => acc + (item.gst || 0), 0);
    const grandTotal = subTotal + totalGST;

    const invoiceNo = await generateNextInvoiceNo();
    const billNo = await generateNextBillNo();

    const amountInWords = numberToWords.toWords(grandTotal) + " only";

    const invoice = new Invoice({
      invoiceNo,
      billNo,
      invoiceDate,
      userId,
      customerId,
      orderReference,
      forCompany,
      items,
      subTotal,
      totalGST,
      grandTotal,
      amountInWords,
      paymentInstructions,
      status: status || "Not Paid"
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error("Invoice creation failed:", error);
    res.status(500).json({ error: "Failed to create invoice", details: error.message });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("userId")
      .populate("customerId")
      .populate("orderReference");

    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("userId")
      .populate("customerId")
      .populate("orderReference")
      .sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.items) {
      updates.subTotal = updates.items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
      updates.totalGST = updates.items.reduce((acc, item) => acc + (item.gst || 0), 0);
      updates.grandTotal = updates.subTotal + updates.totalGST;
      updates.amountInWords = numberToWords.toWords(updates.grandTotal) + " only";
    }

    const updated = await Invoice.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) return res.status(404).json({ error: "Invoice not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Invoice.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Invoice not found" });

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
