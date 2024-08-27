import React, { useState } from "react";
import { FaPlus, FaDownload } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import EmployeeList from "../Layout/Components/EmployeeList";
import { useNavigate } from "react-router";

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("allTime");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterOption) => {
    setFilter(filterOption);
  };

  return (
    <div className="h-screen ml-1 w">
      <div className="max-h-dvh bg-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex justify-center items-center gap-x-2">
            <div className="rounded-full overflow-hidden mr-2">
              <img
                src="/personal-trainer.gif"
                alt="Description of GIF"
                className="h-9"
              />
            </div>

            <h1 className="text-3xl font-bold text-white">All Employee</h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search Employees..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border rounded px-4 py-2 bg-stone-700 bg-opacity-50 text-stone-100"
            />
            <button
              className="bg-[#574898] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
              onClick={() => navigate("/mapping")}
            >
              <FaPlus className="w-5 h-5" />
              <span>Map Customer</span>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600">
              <FaDownload className="w-5 h-5" />
              <span>Export</span>
            </button>
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 bg-stone-200">
                  <span>Filter By</span>
                  <ChevronDownIcon className="w-5 h-5" />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } group flex rounded-md items-center w-full p-2 text-sm`}
                        onClick={() => handleFilterChange("last7Days")}
                      >
                        Last 7 Days
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } group flex rounded-md items-center w-full p-2 text-sm`}
                        onClick={() => handleFilterChange("last30Days")}
                      >
                        Last 30 Days
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } group flex rounded-md items-center w-full p-2 text-sm`}
                        onClick={() => handleFilterChange("allTime")}
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

        <EmployeeList searchQuery={searchQuery} filter={filter} />
      </div>
    </div>
  );
};

export default Employees;
