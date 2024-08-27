import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Select from "react-select";

const Mapping = () => {
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch employees
    axios.get("http://localhost:8000/api/employee?all=true")
      .then((response) => setEmployees(response.data.employees.reverse()))
      .catch((error) => console.error(error));

    // Fetch customers
    axios.get("http://localhost:8000/api/customer?all=true")
      .then((response) => setCustomers(response.data.customers.reverse()))
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
      employeeId: selectedEmployee.value
    })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        // Reset selections
        setSelectedEmployee(null);
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
    <div className="h-screen ml-1 p-10">
      <div className="max-h-screen bg-stone-700 bg-opacity-50 rounded-lg text-white p-8">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-black" controlId="formEmployeeSelect">
            <Form.Label className="text-white">Search and Select Employee</Form.Label>
            <Select
            className=""
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              options={employees.map((employee) => ({
                value: employee._id,
                label: `${employee.fullname} (Phone Number: ${employee.mobileNumber})`
              }))}
              placeholder="Search and select an employee"
              isSearchable
            />
          </Form.Group>

          <Form.Group className="mb-3 text-black" controlId="formCustomerSelect">
            <Form.Label className="text-white">Search and Select Customer</Form.Label>
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
        {successMessage && <div style={{ color: 'green', marginTop: '10px' }} className="bg-stone-900 font-semibold bg-opacity-90 w-max px-3 py-1 rounded-lg">{successMessage}</div>}

        {/* Display error message */}
        {errorMessage && <div style={{ color: 'red', marginTop: '10px' }} className="bg-stone-900 font-semibold bg-opacity-90 w-max px-3 py-1 rounded-lg">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Mapping;
