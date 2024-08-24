import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const List = ({ searchQuery, filter }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/customer', {
          params: { search: searchQuery, filter: filter },
        });
        setCustomers(response.data.reverse());
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, [searchQuery, filter]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/customer/${id}`);
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // assuming you store the token in localStorage
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-300">
            <tr>
              <th className="px-4 py-2 text-left text-base font-medium text-[#574898] uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-base font-medium text-[#574898] uppercase tracking-wider">
                Mobile Number
              </th>
              <th className="px-4 py-2 text-left text-base font-medium text-[#574898] uppercase tracking-wider">
                Email ID
              </th>
              <th className="px-4 py-2 text-left text-base font-medium text-[#574898] uppercase tracking-wider">
                Address
              </th>
              <th className="px-4 py-2 text-left text-base font-medium text-[#574898] uppercase tracking-wider">
                Timing
              </th>
              <th className="px-4 py-2 text-left text-base font-medium text-[#574898] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-base font-normal text-fadegray">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="px-4 py-1 whitespace-nowrap capitalize">{customer.fullname}</td>
                  <td className="px-4 py-1 whitespace-nowrap">{customer.mobileNumber}</td>
                  <td className="px-4 py-1 whitespace-nowrap">{customer.emailId}</td>
                  <td className="px-4 py-1 whitespace-nowrap capitalize">{customer.address}</td>
                  <td className="px-4 py-1 whitespace-nowrap">{customer.time}</td>
                  <td className="px-4 py-1 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className={`bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 ${
                        role !== "admin" ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      disabled={role !== "admin"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="5">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
