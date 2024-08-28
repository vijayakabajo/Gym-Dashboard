import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    emailId: "",
    mobileNumber: "",
    address: "",
    plan: "",
    sessionType: "",
    assignedEmployees: [],
    totalAmount: 0,
    amountPaid: 0,
    debt: 0,
  });

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const plans = {
    "per day": 750,
    "1 month": 7500,
    "3 months": 17000,
    "6 months": 22000,
    "12 months": 27500,
  };

  const sessions = {
    "1 session": 1250,
    "12 sessions": 12500,
    "24 sessions": 19500,
    "12 sessions (couple)": 19000,
    "24 sessions (couple)": 30000,
  };

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employee?all=true"
        );
        setEmployees(response.data.employees.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Calculate totals only when the relevant fields change
    if (name === "plan" || name === "sessionType" || name === "amountPaid") {
      calculateTotal({ ...formData, [name]: value });
    }
  };

  const calculateTotal = (updatedFormData) => {
    let total = 0;
    const { plan, sessionType, amountPaid } = updatedFormData;

    // Add plan amount if selected
    if (plan) {
      total += plans[plan];
    }

    // Add session amount if selected
    if (sessionType) {
      total += sessions[sessionType];
    }

    // Calculate the debt
    const debt = total - (amountPaid ? parseFloat(amountPaid) : 0);

    // Update the formData state
    setFormData((prevState) => ({
      ...prevState,
      totalAmount: total,
      debt: debt,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const assignedEmployees = selectedEmployees.map((emp) => emp.value);

    // Prepare the data to be sent, excluding sessionType if not selected
    const dataToSend = {
      fullname: formData.fullname,
      emailId: formData.emailId,
      mobileNumber: formData.mobileNumber,
      address: formData.address,
      plan: formData.plan,
      totalAmount: formData.totalAmount,
      amountPaid: formData.amountPaid,
      debt: formData.debt,
      assignedEmployees: assignedEmployees,
    };

    // Include sessionType only if it is selected
    if (formData.sessionType) {
      dataToSend.sessionType = formData.sessionType;
    }

    try {
      await axios.post("http://localhost:8000/api/customer", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Customer data submitted successfully!");
      setFormData({
        fullname: "",
        emailId: "",
        mobileNumber: "",
        address: "",
        plan: "",
        sessionType: "",
        assignedEmployees: [],
        totalAmount: 0,
        amountPaid: 0,
        debt: 0,
      });
      setSelectedEmployees([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Error submitting the data: Make Sure The Email/Phone No. is unique (${error.message})`
      );
    }
  };

  // UI PART

  return (
    <div className="h-[800] ml-1 p-4 sm:p-10 overflow-y-auto">
      <div className="min-h-screen text-white bg-stone-700 bg-opacity-50 rounded-lg p-4 sm:p-8">
        <Form onSubmit={handleSubmit} className="h-full">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="w-full flex justify-around space-x-8">
            <div className="w-1/2">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="johndoe@gmail.com"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="w-1/2">
              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123-456-7890"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="123 Main St, Anytown, USA"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
           <Form.Group controlId="formBasicPlan" className="w-full">
              <Form.Label>Membership Plan</Form.Label>
              <Form.Control
                as="select"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                required
              >
                <option value="">Select Plan</option>
                {Object.keys(plans).map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicSession" className="w-full">
              <Form.Label>Session Type</Form.Label>
              <Form.Control
                as="select"
                name="sessionType"
                value={formData.sessionType}
                onChange={handleChange}
              >
                <option value="">Select Session</option>
                {Object.keys(sessions).map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmployee">
            <Form.Label>Assign Personal Trainer</Form.Label>
            <Select
              value={selectedEmployees}
              onChange={setSelectedEmployees}
              options={employees.map((employee) => ({
                value: employee._id,
                label: `${employee.fullname} (Phone Number: ${employee.mobileNumber})`,
              }))}
              placeholder="Search and select personal trainer"
              isMulti
              isSearchable
              className="text-black"
            />
          </Form.Group>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <Form.Group controlId="formBasicTotalAmount" className="w-full">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                readOnly
                className="bg-gray-200"
              />
            </Form.Group>

            <Form.Group controlId="formBasicAmountPaid" className="w-full">
              <Form.Label>Amount Paid</Form.Label>
              <Form.Control
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                className="w-full"
              />
            </Form.Group>

            <Form.Group controlId="formBasicDebt" className="w-full">
              <Form.Label>Debt</Form.Label>
              <Form.Control
                type="number"
                name="debt"
                value={formData.debt}
                onChange={handleChange}
                readOnly
                className="bg-gray-200"
              />
            </Form.Group>
          </div>

          <Button variant="primary" type="submit" className="w-full mt-4">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddCustomer;
