import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="py-4 text-white h-full sticky top-0 bg-stone-800 flex flex-col ml-3 mr-5">
      <div className="mx-2 hover:bg-stone-400 hover:bg-opacity-40 px-2 rounded-lg">
        <div className="flex justify-start items-center">
          <div className="rounded-full overflow-hidden h-8">
            <img src="/chart.gif" alt="Description of GIF" className="h-8" />
          </div>
          <div>
            <p
              className="font-semibold text-2xl px-2 py-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Dashboard
            </p>
          </div>
        </div>
      </div>
      <ul className="list-disc list-inside ml-10 mt-2">
        <li
          className="p-1 py-2 rounded-lg px-3 hover:bg-stone-400 hover:bg-opacity-40 cursor-pointer text-nowrap"
          onClick={() => navigate("/customers")}
        >
          All Clients
        </li>
        <li
          className="p-1 py-2 rounded-lg px-3 hover:bg-stone-400 hover:bg-opacity-40 cursor-pointer text-nowrap"
          onClick={() => navigate("/employees")}
        >
          Personal Trainers
        </li>
        <li
          className="p-1 py-2 rounded-lg px-3 hover:bg-stone-400 hover:bg-opacity-40 cursor-pointer text-nowrap"
          onClick={() => navigate("/revenue")}
        >
          Revenue
        </li>
        <li
          className="p-1 py-2 rounded-lg px-3 hover:bg-stone-400 hover:bg-opacity-40 cursor-pointer text-nowrap"
          onClick={() => navigate("/expiration")}
        >
          Expiration
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
