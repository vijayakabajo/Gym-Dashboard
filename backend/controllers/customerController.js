const Customer = require("../models/customer");
const Employee = require("../models/employee");

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { plan, sessionType, amountPaid } = req.body;

    // Define charges
    const planCharges = {
      "per day": 750,
      "1 month": 7500,
      "3 months": 17000,
      "6 months": 22000,
      "12 months": 27500,
    };

    const sessionCharges = {
      "1 session": 1250,
      "12 sessions": 12500,
      "24 sessions": 19500,
      "12 sessions (couple)": 19000,
      "24 sessions (couple)": 30000,
    };

    // Calculate total amount
    const totalAmount = planCharges[plan] + (sessionType ? sessionCharges[sessionType] : 0);
    const debt = totalAmount - amountPaid;

    // Create customer object
    const customer = new Customer({
      ...req.body,
      totalAmount,
      debt,
    });

    // Save customer
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Get all customers with optional filters
exports.getAllCustomers = async (req, res) => {
  try {
    const { search, filter, page = 1, limit = 8, all } = req.query;
    const query = {};

    // Search
    if (search) {
      query.$or = [
        { fullname: { $regex: search, $options: "i" } },
        { emailId: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by date
    if (filter === "last7Days") {
      query.createdAt = {
        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      };
    } else if (filter === "last30Days") {
      query.createdAt = {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      };
    }

    if (all === 'true') {
      const customers = await Customer.find(query);
      res.status(200).json({
        customers,
        total: customers.length,
        page: 1,
        pages: 1,
      });
    } else {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;

      const [customers, totalCustomers] = await Promise.all([
        Customer.find(query).skip(skip).limit(limitNum),
        Customer.countDocuments(query),
      ]);

      res.status(200).json({
        customers,
        total: totalCustomers,
        page: pageNum,
        pages: Math.ceil(totalCustomers / limitNum),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Get a customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


