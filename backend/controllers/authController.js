const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Employee = require('../models/employee');

// Admin login
exports.login = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    // Find employee by username
    const employee = await Employee.findOne({ emailId });
    if (!employee) return res.status(404).json({ message: 'Data Not Found' });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid Credentials' });

    // Create JWT token
    const payload = { adminId: employee._id, name: employee.fullname, email: employee.emailId, mobile: employee.mobileNumber, address: employee.address, role: employee.role};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to client
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  res.status(200).send({ message: 'Logout successful' });
};
