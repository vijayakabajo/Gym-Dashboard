import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="py-4 pl-2 pr-16 text-black h-full sticky top-0">
      <p
        className="hover:text-black font-semibold pl-5 pr-3 py-2 mb-1 rounded-[5px] hover:bg-[#574898] hover:bg-opacity-50 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Dashboard
      </p>
      <ul className="list-disc list-inside ml-5 mt-2">
        <li
          className="hover:text-black pl-5 pr-3 py-2 mb-1 rounded-[5px] hover:bg-sky-300 cursor-pointer"
          onClick={() => navigate("/customers")}
        >
          Customers List
        </li>
        <li
          className="hover:text-black pl-5 pr-3 py-2 mb-1 rounded-[5px] hover:bg-sky-300 cursor-pointer"
          onClick={() => navigate("/employees")}
        >
          Employee List
        </li>
        <li
          className="hover:text-black pl-5 pr-3 py-2 mb-1 rounded-[5px] hover:bg-sky-300 cursor-pointer"
          onClick={() => navigate("/revenue")}
        >
          Revenue
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
