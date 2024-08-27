import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    emailId: "",
    mobileNumber: "",
    address: "",
    fromTime: "",
    fromPeriod: "AM",
    toTime: "",
    toPeriod: "AM",
    plan: "",
    sessionType: "",
    assignedEmployees: [],
    totalAmount: 0,
    amountPaid: 0,
    debt: 0,
  });

  const [employees, setEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);

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

  useEffect(() => {
    const fetchEmployees = async () => {
      axios
        .get("http://localhost:8000/api/employee?all=true")
        .then((response) => setEmployees(response.data.employees.reverse()))
        .catch((error) => console.error(error));
    };

    fetchEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "plan" || name === "sessionType" || name === "amountPaid") {
      calculateTotal(name === "amountPaid" ? undefined : value, name);
    }
  };

  const calculateTotal = (value, field) => {
    let total = 0;
    let paid = formData.amountPaid;

    if (field === "plan") {
      total = sessions[formData.sessionType] + plans[value];
    } else if (field === "sessionType") {
      total = plans[formData.plan] + sessions[value];
    } else if (field === "amountPaid") {
      paid = value ? parseFloat(value) : 0;
    } else {
      total = sessions[formData.sessionType] + plans[formData.plan];
    }

    const debt = total - paid;

    setFormData((prevState) => ({
      ...prevState,
      totalAmount: total,
      debt: debt,
    }));
  };

  const handleEmployeeAssign = (event) => {
    const employeeId = event.target.value;
    if (employeeId && !assignedEmployees.includes(employeeId)) {
      setAssignedEmployees([...assignedEmployees, employeeId]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const time = `${formData.fromTime} ${formData.fromPeriod} - ${formData.toTime} ${formData.toPeriod}`;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/customer",
        { ...formData, time, assignedEmployees },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Customer data submitted successfully!");
      setFormData({
        fullname: "",
        emailId: "",
        mobileNumber: "",
        address: "",
        fromTime: "",
        fromPeriod: "AM",
        toTime: "",
        toPeriod: "AM",
        plan: "",
        sessionType: "",
        assignedEmployees: [],
        totalAmount: 0,
        amountPaid: 0,
        debt: 0,
      });
      setAssignedEmployees([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Error submitting the data: Make Sure The Email/Phone No. is unique (${error.message})`
      );
    }
  };

  return (
    <div className="h-screen ml-1 p-10">
      <div className="max-h-screen text-white bg-stone-700 bg-opacity-50 rounded-lg p-8">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="johndoe@gmail.com"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMobile">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="123-456-7890"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </Form.Group>

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

          {/* Aligning Time, Plan, and Session on one line */}
          <div className="d-flex justify-content-between mb-3">
            <Form.Group controlId="formBasicTime" className="w-32">
              <Form.Label>Time</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  placeholder="From"
                  name="fromTime"
                  value={formData.fromTime}
                  onChange={handleChange}
                  min="1"
                  max="12"
                  className="mr-2 w-20"
                />
                <Form.Control
                  as="select"
                  name="fromPeriod"
                  value={formData.fromPeriod}
                  onChange={handleChange}
                  className="w-16"
                >
                  <option>AM</option>
                  <option>PM</option>
                </Form.Control>
                <span className="mx-2 place-self-center">-</span>
                <Form.Control
                  type="number"
                  placeholder="To"
                  name="toTime"
                  value={formData.toTime}
                  onChange={handleChange}
                  min="1"
                  max="12"
                  className="mr-2 w-20"
                />
                <Form.Control
                  as="select"
                  name="toPeriod"
                  value={formData.toPeriod}
                  onChange={handleChange}
                  className="w-16"
                >
                  <option>AM</option>
                  <option>PM</option>
                </Form.Control>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPlan" className="w-32">
              <Form.Label>Plan</Form.Label>
              <Form.Control
                as="select"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
              >
                <option value="">Select Plan</option>
                {Object.keys(plans).map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicSession" className="w-32">
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
            <Form.Label>Assign Employee</Form.Label>
            <Form.Control as="select" onChange={handleEmployeeAssign} className="text-black">
              <option value="" >Select Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </Form.Control>
            <div className="mt-3">
              <h5>Assigned Employees:</h5>
              <ul>
                {assignedEmployees.map((employeeId) => {
                  const employee = employees.find(
                    (emp) => emp._id === employeeId
                  );
                  return <li key={employeeId}>{employee?.name}</li>;
                })}
              </ul>
            </div>
          </Form.Group>

          <div className="inline-flex">
            <Form.Group className="mb-3" controlId="formBasicTotal">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPaid">
              <Form.Label>Amount Paid</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount Paid"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDebt">
              <Form.Label>Debt</Form.Label>
              <Form.Control
                type="number"
                name="debt"
                value={formData.debt}
                readOnly
              />
            </Form.Group>
          </div>
          <div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCustomer;
