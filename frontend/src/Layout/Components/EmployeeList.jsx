import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const EmployeeList = ({ searchQuery, filter }) => {
  const [employees, setEmployees] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/employee", {
          params: { search: searchQuery, filter: filter },
        });
        setEmployees(response.data.reverse());
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, [searchQuery, filter]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/employee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#574898] text-white">
            <tr>
              <th className="px-2 py-2 text-left text-base font-medium uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-2 py-2 text-left text-base font-medium uppercase tracking-wider">
                Mobile Number
              </th>
              <th className="px-2 py-2 text-left text-base font-medium uppercase tracking-wider">
                Email ID
              </th>
              <th className="px-2 py-2 text-left text-base font-medium uppercase tracking-wider">
                Address
              </th>
              <th className="px-2 py-2 text-left text-base font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-2 py-2 text-left text-base font-medium uppercase tracking-wider">
                Since
              </th>
              <th className="px-2 py-2 text-left text-base font-medium uppercase tracking-wider">
                Customers
              </th>
              <th className="px-2 py-2 text-left text-base font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-stone-700 bg-opacity-70  divide-y divide-gray-200 text-base font-normal text-white">
            {employees.length > 0 ? (
              employees
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((employee) => (
                  <tr key={employee._id}>
                    <td className="px-2 py-1 whitespace-nowrap capitalize">
                      {employee.fullname}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      {employee.mobileNumber}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      {employee.emailId}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap capitalize">
                      {employee.address}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      {employee.role}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      {new Date(employee.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap flex items-center justify-center">
                      <button className="bg-stone-600 text-white text-sm px-2 py-1 rounded-lg hover:bg-stone-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                            clipRule="evenodd"
                          />
                          <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                      </button>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className={`bg-red-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-red-600 ${
                          role !== "admin"
                            ? "cursor-not-allowed opacity-50"
                            : ""
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
                <td className="px-6 py-4 text-center" colSpan="6">
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

export default EmployeeList;
