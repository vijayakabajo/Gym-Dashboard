import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Select from "react-select";

const Mapping = () => {
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch employees
    axios.get("http://localhost:8000/api/employee")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));

    // Fetch customers
    axios.get("http://localhost:8000/api/customer")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer || !selectedEmployee) {
      setErrorMessage("Please select both an employee and a customer.");
      return;
    }

    // Map the customer to the employee
    axios.post("http://localhost:8000/api/employee/assign", {
      customerId: selectedCustomer.value,
      employeeId: selectedEmployee
    })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        // Reset selections
        setSelectedEmployee("");
        setSelectedCustomer(null);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message || "Error mapping customer to employee.");
        } else {
          setErrorMessage("An unknown error occurred.");
        }
        setSuccessMessage("");
      });
  };

  return (
    <div className="bg-fadewhite h-screen ml-1 p-10">
      <div className="max-h-screen bg-gray-100 p-8">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmployeeSelect">
            <Form.Label>Select Employee</Form.Label>
            <Form.Control
              as="select"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">-- Select Employee --</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.fullname} (Phone Number: {employee.mobileNumber})
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCustomerSelect">
            <Form.Label>Search and Select Customer</Form.Label>
            <Select
              value={selectedCustomer}
              onChange={setSelectedCustomer}
              options={customers.map((customer) => ({
                value: customer._id,
                label: `${customer.fullname} (Phone Number: ${customer.mobileNumber})`
              }))}
              placeholder="Search and select a customer"
              isSearchable
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Map Customer to Employee
          </Button>
        </Form>

        {/* Display success message */}
        {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}

        {/* Display error message */}
        {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Mapping;
