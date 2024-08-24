import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const RevenuePage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const revenueData = [
    { customer: 'Customer 1', monthlyRevenue: 8000, date: '2024-08-01' },
    { customer: 'Customer 2', monthlyRevenue: 3200, date: '2024-08-01' },
  ];

  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.monthlyRevenue, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Monthly Revenue</h1>
        <div className="flex items-center space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="bg-[#e5e7eb] text-[#1f2937] px-4 py-2 rounded-lg"
            placeholderText="Select Date"
          />
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300">
                <span>Filter By Date</span>
                <ChevronDownIcon className="w-5 h-5" />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
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
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group flex rounded-md items-center w-full p-2 text-sm`}
                    >
                      All Time
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      {/* Total Revenue Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">Total Monthly Revenue</h2>
        <p className="text-4xl text-green-500 mt-2">${totalRevenue.toLocaleString()}</p>
      </div>

      {/* Revenue Table Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {revenueData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{data.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">${data.monthlyRevenue.toLocaleString()}</td>
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
