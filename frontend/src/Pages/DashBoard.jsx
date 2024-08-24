import React from "react";
import Item from "../Layout/Components/Item";
import { RiCustomerService2Line } from "react-icons/ri";
import { BsPersonVcard } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";

const DashBoard = () => {
  return (
    <div className="bg-fadewhite ml-1 p-10">
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Item data={{
                img: RiCustomerService2Line,
                name: "Customers",
                redirectURL: "/customers"
            }}/>
            <Item data={{
                img: BsPersonVcard,
                name: "Employees",
                redirectURL: "/employees"
            }}/>
            <Item data={{
                img: MdAttachMoney,
                name: "Revenue",
                redirectURL: "/revenue"
            }}/>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
