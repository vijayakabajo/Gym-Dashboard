import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const RevenuePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [membershipRevenue, setMembershipRevenue] = useState(0);
  const [sessionRevenue, setSessionRevenue] = useState(0);

  const fetchRevenueData = async (selectedDate) => {
    try {
      const currentYear = selectedDate.getFullYear();
      const currentMonth = selectedDate.getMonth() + 1; // getMonth() is 0-indexed

      // Determine the API URL based on whether we're fetching for the current month or a specific one
      const apiUrl =
        selectedDate.getMonth() === new Date().getMonth() && selectedDate.getFullYear() === new Date().getFullYear()
          ? `http://localhost:8000/api/customer/revenue`
          : `http://localhost:8000/api/customer/revenue?filter=specificMonth&month=${currentMonth}&year=${currentYear}`;

      const response = await axios.get(apiUrl);
      console.log('API Response:', response.data);

      setRevenueData(response.data.revenueData || []);
      setTotalRevenue(response.data.totalRevenue || 0);
      setMembershipRevenue(response.data.membershipRevenue || 0);
      setSessionRevenue(response.data.sessionRevenue || 0);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  useEffect(() => {
    fetchRevenueData(startDate);
  }, [startDate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-col md:flex-row mb-6 gap-y-3">
        <div className="flex justify-center items-center gap-x-2">
          <div className="rounded-full overflow-hidden mr-2">
            <img src="revenue.gif" alt="Calendar" className="h-9" />
          </div>
          <h1 className="text-3xl font-bold text-white">Monthly Revenue</h1>
        </div>

        <div className="flex items-center space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="bg-[#e5e7eb] text-[#1f2937] px-2 py-2 rounded-lg"
            placeholderText="Select Month and Year"
          />
        </div>
      </div>

      {/* Total Revenue Section */}
      <div className="bg-stone-700 bg-opacity-80 text-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">Total Revenue (In Cash)</h2>
        <p className="text-4xl text-green-500 mt-2">₹{totalRevenue.toLocaleString()}</p>
      </div>

      {/* Membership Revenue Section */}
      <div className="bg-stone-700 bg-opacity-70 text-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">Membership Revenue</h2>
        <p className="text-4xl text-blue-500 mt-2">₹{membershipRevenue.toLocaleString()}</p>
      </div>

      {/* Session Revenue Section */}
      <div className="bg-stone-700 bg-opacity-70 text-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">PT / Sessions Revenue</h2>
        <p className="text-4xl text-purple-500 mt-2">₹{sessionRevenue.toLocaleString()}</p>
      </div>

      {/* Revenue Table Section */}
      {/* <div className="bg-stone-700 bg-opacity-50 text-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-stone-700 bg-opacity-50 divide-y divide-gray-200">
            {revenueData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{data.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{(data.monthlyRevenue || 0).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default RevenuePage;
