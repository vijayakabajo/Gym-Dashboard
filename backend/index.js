const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();



//routes
// const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const exportRoutes = require("./routes/exportRoutes");
const ptCustomerRoutes = require("./routes/ptCustomerRoutes");
const revenueRoutes = require("./routes/revenue2");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = 3000;

//connections
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((e) => console.log("Error: ", e));

// app.use("/", authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/ptcustomer', ptCustomerRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/export', exportRoutes);
app.use("/api/revenue", revenueRoutes);
app.use('/api', authRoutes); // login/logout

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
