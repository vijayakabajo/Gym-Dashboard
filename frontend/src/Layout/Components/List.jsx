import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({ searchQuery, filter }) => {
  const [customers, setCustomers] = useState([]);
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1); // State for the current page
  const [totalPages, setTotalPages] = useState(1); // State for the total number of pages
  const limit = 7; // Items per page

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/customer", {
          params: {
            search: searchQuery,
            filter: filter,
            page: page,
            limit: limit,
          },
        });
        setCustomers(response.data.customers);
        setTotalPages(Math.ceil(response.data.total / limit)); // Calculate total pages based on response
      } catch (error) {
        console.error("Error fetching customer data:", error);
        toast.error("Failed to fetch customers.");
      }
    };

    fetchCustomers();
  }, [searchQuery, filter, page]); // Include 'page' in the dependency array

  useEffect(() => {
    const token = localStorage.getItem("token"); // assuming you store the token in localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
        setRole("");
      }
    }
  }, []);

  const handleDelete = async (id) => {
    if (role !== "admin") {
      alert("You do not have permission to delete customers.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      await axios.delete(`http://localhost:8000/api/customer/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
      toast.success("Customer deleted successfully.");
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer.");
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden min-h-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#574898] text-white">
            <tr>
              <th className="px-3 py-2 text-left text-base font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 py-2 text-left text-base font-medium uppercase tracking-wider">
                Mobile No.
              </th>
              <th className="px-3 py-2 text-left text-base font-medium uppercase tracking-wider">
                Email ID
              </th>
              <th className="px-3 py-2 text-left text-base font-medium uppercase tracking-wider">
                Address
              </th>
              <th className="px-3 py-2 text-left text-base font-medium uppercase tracking-wider">
                Joined
              </th>
              <th className="px-3 py-2 text-center text-base font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-base font-normal bg-stone-700 bg-opacity-70 text-white">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="px-3 py-2 whitespace-nowrap capitalize">
                    {customer.fullname}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {customer.mobileNumber}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {customer.emailId}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap capitalize">
                    {customer.address}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Date(customer.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="bg-red-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      title={`Delete ${customer.fullname}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-3 py-2 text-center text-base font-medium text-red-600"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-2 mx-1 rounded-lg text-white ${
            page === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-800"
          }`}
        >
          Previous
        </button>
        <span className="px-3 py-2 text-lg font-medium text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-2 mx-1 rounded-lg text-white ${
            page === totalPages
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-800"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
