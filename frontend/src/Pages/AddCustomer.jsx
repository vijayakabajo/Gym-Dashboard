import React, { useState } from "react";
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
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Combine time inputs into the desired format
    const time = `${formData.fromTime} ${formData.fromPeriod} - ${formData.toTime} ${formData.toPeriod}`;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/customer",
        { ...formData, time }, // Replace individual time fields with the combined time string
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
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the data. Please try again.");
    }
  };

  return (
    <div className="bg-fadewhite h-screen ml-1 p-10">
      <div className="max-h-screen bg-gray-100 p-8">
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

          <Form.Group className="mb-3" controlId="formBasicTime">
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
                className="mr-2 w-24"
              />
              <Form.Control
                as="select"
                name="fromPeriod"
                value={formData.fromPeriod}
                onChange={handleChange}
                className="w-24"
              >
                <option>AM</option>
                <option>PM</option>
              </Form.Control>
              <span className="mx-4 place-self-center">-</span>
              <Form.Control
                type="number"
                placeholder="To"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                min="1"
                max="12"
                className="mr-2  w-24"
              />
              <Form.Control
                as="select"
                name="toPeriod"
                value={formData.toPeriod}
                onChange={handleChange}
                className="w-24"
              >
                <option>AM</option>
                <option>PM</option>
              </Form.Control>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddCustomer;
