import React from "react";
import Item from "../Layout/Components/Item";
// import { RiCustomerService2Line } from "react-icons/ri";
import { BsPersonVcard } from "react-icons/bs";
import { MdCurrencyRupee } from "react-icons/md";
import { HiOutlineUsers, HiXCircle } from "react-icons/hi";

const DashBoard = () => {
  return (
    <div className="">
      <div className="min-h-screen bg-gray-100 p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Item data={{
                img: HiOutlineUsers,
                name: "Customers",
                redirectURL: "/customers"
            }}/>
            <Item data={{
                img: BsPersonVcard,
                name: "Employees",
                redirectURL: "/employees"
            }}/>
            <Item data={{
                img: MdCurrencyRupee,
                name: "Revenue",
                redirectURL: "/revenue"
            }}/>
            <Item data={{
                img: HiXCircle,
                name: "Expiration",
                redirectURL: "/expiration"
            }}/>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
