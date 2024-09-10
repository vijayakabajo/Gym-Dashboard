import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    emailId: "",
    mobileNumber: "",
    address: "",
    plan: "",
    planCost: 0,
    sessionType: "",
    sessionCost: 0,
    assignedEmployees: [],
    totalAmount: 0,
    amountPaid: 0,
    debt: 0,
    paymentMode: "cash", // Added new state for payment mode
  });

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showSessionOptions, setShowSessionOptions] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://fitpreneurs.onrender.com/api/employee?all=true"
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

    if (
      name === "planCost" ||
      name === "sessionCost" ||
      name === "amountPaid"
    ) {
      calculateTotal({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (event) => {
    setShowSessionOptions(event.target.checked);

    if (!event.target.checked) {
      calculateTotal({
        ...formData,
        sessionType: "",
        sessionCost: 0,
      });
    }
  };

  const calculateTotal = (updatedFormData) => {
    let total = 0;
    const { plan, sessionType, amountPaid, planCost, sessionCost } =
      updatedFormData;

    if (plan) {
      total += parseFloat(planCost) || 0;
    }

    if (sessionType) {
      total += parseFloat(sessionCost) || 0;
    }

    const debt = total - (amountPaid ? parseFloat(amountPaid) : 0);

    setFormData((prevState) => ({
      ...prevState,
      totalAmount: total,
      debt: debt,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const assignedEmployees = selectedEmployees.map((emp) => emp.value);

    const dataToSend = {
      fullname: formData.fullname,
      emailId: formData.emailId,
      mobileNumber: formData.mobileNumber,
      address: formData.address,
      plan: formData.plan,
      planCost: formData.planCost,
      totalAmount: formData.totalAmount,
      amountPaid: formData.amountPaid,
      debt: formData.debt,
      paymentMode: formData.paymentMode, // Added payment mode to data
      assignedEmployees: assignedEmployees,
    };

    if (showSessionOptions) {
      dataToSend.sessionType = formData.sessionType;
      dataToSend.sessionCost = formData.sessionCost;
    }

    try {
      const response = await axios.post(
        "https://fitpreneurs.onrender.com/api/customer",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Customer data submitted successfully!");
      navigate(`/client/${response.data._id}`, { state: response.data });
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
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
                <option value="per day">Per Day</option>
                <option value="1 month">1 Month</option>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
                <option value="12 months">12 Months</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPlanCost" className="w-full">
              <Form.Label>Plan Cost</Form.Label>
              <Form.Control
                type="number"
                name="planCost"
                value={formData.planCost}
                onChange={handleChange}
                disabled={!formData.plan}
                required
              />
            </Form.Group>
          </div>

          <Form.Group controlId="formBasicShowSession" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Include Sessions"
              checked={showSessionOptions}
              onChange={handleCheckboxChange}
            />
          </Form.Group>

          {showSessionOptions && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <Form.Group controlId="formBasicSessionType" className="w-full">
                <Form.Label>Session Type</Form.Label>
                <Form.Control
                  as="select"
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleChange}
                  disabled={!showSessionOptions}
                >
                  <option value="">Select Session</option>
                  <option value="1 session">1 Session</option>
                  <option value="12 sessions">12 Sessions</option>
                  <option value="24 sessions">24 Sessions</option>
                  <option value="12 sessions (couple)">
                    12 Sessions (Couple)
                  </option>
                  <option value="24 sessions (couple)">
                    24 Sessions (Couple)
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicSessionCost" className="w-full">
                <Form.Label>Session Cost</Form.Label>
                <Form.Control
                  type="number"
                  name="sessionCost"
                  value={formData.sessionCost}
                  onChange={handleChange}
                  disabled={!formData.sessionType}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicAssignedEmployees"
                className="w-full"
              >
                <Form.Label>Assigned Personal Trainer(s)</Form.Label>
                <Select
                  isMulti
                  name="assignedEmployees"
                  options={employees.map((employee) => ({
                    value: employee._id,
                    label: `${employee.fullname} (${employee.mobileNumber})`,
                  }))}
                  value={selectedEmployees}
                  onChange={setSelectedEmployees}
                  className="basic-multi-select text-black"
                  classNamePrefix="select"
                  isDisabled={!formData.sessionType}
                />
              </Form.Group>
            </div>
          )}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Form.Group controlId="formBasicTotalAmount" className="w-full">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formBasicAmountPaid" className="w-full">
              <Form.Label>Amount Paid</Form.Label>
              <Form.Control
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPaymentMode" className="w-full">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Control
                as="select"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicDebt" className="w-full">
              <Form.Label>Debt</Form.Label>
              <Form.Control
                type="number"
                name="debt"
                value={formData.debt}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
          </div>

          <div className="flex justify-center items- w-full mt-5">
            <Button variant="primary" type="submit" className="w-1/2 lg:w-1/4">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCustomer;
