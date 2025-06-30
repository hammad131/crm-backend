const Customer = require("../models/Customer");

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      email,
      universityName,
      universityPrefix,
      departmentName,
      departmentPrefix,
      designation
    } = req.body;

    const customer = new Customer({
      name,
      address,
      phone,
      email,
      universityName,
      universityPrefix,
      departmentName,
      departmentPrefix,
      designation
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Customer creation failed.", details: error.message });
  }
};

// Get a single customer by ID
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const customer = await Customer.findByIdAndUpdate(id, updates, { new: true });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
