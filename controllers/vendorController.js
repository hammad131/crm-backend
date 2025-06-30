const Vendor = require("../models/Vendor");

exports.createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    console.error("Vendor creation failed:", error);
    res.status(500).json({ error: "Failed to create vendor", details: error.message });
  }
};

exports.getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Vendor not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Vendor.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Vendor not found" });
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
