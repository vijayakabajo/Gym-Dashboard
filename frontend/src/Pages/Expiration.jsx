import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // For date manipulation

const ExpiringMemberships = () => {
  const [expiringCustomers, setExpiringCustomers] = useState([]);

  useEffect(() => {
    fetchExpiringCustomers();
  }, []);

  const fetchExpiringCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/customers/expiring");
      const customers = response.data.filter((customer) => {
        const daysLeft = moment(customer.membershipEndDate).diff(moment(), "days");
        return daysLeft <= 7 && daysLeft >= 0; // Memberships expiring within 7 days
      });
      setExpiringCustomers(customers);
    } catch (error) {
      console.error("Error fetching expiring memberships", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around space-y-4 md:space-y-0 py-3 items-center">
      <div className="bg-stone-700 bg-opacity-50 px-16 py-3 m-2 rounded-lg w-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white font-serif text-3xl mb-3 font-semibold">Expiring Memberships</h1>
          <div className="rounded-full overflow-hidden">
            <img src="/warning.gif" alt="warning" className="h-36" />
          </div>
        </div>
        <div className="space-y-3 p-2 font-base mt-6 text-white">
          {expiringCustomers.length > 0 ? (
            expiringCustomers.map((customer) => (
              <div key={customer._id} className="mb-4 p-2 border-b border-gray-600">
                <p className="capitalize"><strong>Full Name:</strong> {customer.fullname}</p>
                <p><strong>Email:</strong> {customer.emailId}</p>
                <p><strong>Mobile:</strong> {customer.mobileNumber}</p>
                <p className="capitalize"><strong>Address:</strong> {customer.address}</p>
                <p><strong>Membership Ends:</strong> {moment(customer.membershipEndDate).format("MMMM Do YYYY")}</p>
              </div>
            ))
          ) : (
            <p>No memberships expiring within the next 7 days.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpiringMemberships;
