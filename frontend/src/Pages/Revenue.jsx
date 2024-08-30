import React, { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const RevenuePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [membershipRevenue, setMembershipRevenue] = useState(0);
  const [sessionRevenue, setSessionRevenue] = useState(0);
  const [filter, setFilter] = useState('last7Days'); // Default filter

  const fetchRevenueData = async (filterType = filter) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/customer/revenue?filter=${filterType}&month=${startDate.getMonth() + 1}&year=${startDate.getFullYear()}`);
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
    fetchRevenueData();
  }, [filter, startDate]);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    fetchRevenueData(filterType);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex justify-center items-center gap-x-2">
          <div className="rounded-full overflow-hidden mr-2">
            <img
              src="calendar.gif"
              alt="Calendar"
              className="h-9"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Revenue Overview</h1>
        </div>

        <div className="flex items-center space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="bg-[#e5e7eb] text-[#1f2937] px-2 py-2 rounded-lg"
            placeholderText="Select Date"
          />
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-stone-200">
                <span>Filter By</span>
                <ChevronDownIcon className="w-5 h-5" />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilterChange('last7Days')}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group flex rounded-md items-center w-full p-2 text-sm`}
                    >
                      Last 7 Days
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilterChange('last30Days')}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group flex rounded-md items-center w-full p-2 text-sm`}
                    >
                      Last 30 Days
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilterChange('specificMonth')}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group flex rounded-md items-center w-full p-2 text-sm`}
                    >
                      Specific Month
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      {/* Total Revenue Section */}
      <div className="bg-stone-700 bg-opacity-80 text-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">Total Revenue</h2>
        <p className="text-4xl text-green-500 mt-2">₹{totalRevenue.toLocaleString()}</p>
      </div>

      {/* Membership Revenue Section */}
      <div className="bg-stone-700 bg-opacity-70 text-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">Membership Revenue</h2>
        <p className="text-4xl text-blue-500 mt-2">₹{membershipRevenue.toLocaleString()}</p>
      </div>

      {/* Session Revenue Section */}
      <div className="bg-stone-700 bg-opacity-70 text-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">Session Revenue</h2>
        <p className="text-4xl text-purple-500 mt-2">₹{sessionRevenue.toLocaleString()}</p>
      </div>

      {/* Revenue Table Section */}
      <div className="bg-stone-700 bg-opacity-50 text-white shadow-lg rounded-lg overflow-x-auto">
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
                <td className="px-6 py-4 whitespace-nowrap">${(data.monthlyRevenue || 0).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenuePage;
