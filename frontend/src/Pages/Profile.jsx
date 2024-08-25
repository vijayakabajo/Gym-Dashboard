import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // assuming you store the token in localStorage
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-row justify-around items-center w-full h-screen">
      <div className=" bg-stone-700 bg-opacity-50 px-16 py-4 rounded-lg">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white font-serif text-3xl mb-3 font-semibold">My Details</h1>
          <div className="rounded-full overflow-hidden">
            <img src="/personal-trainer.gif" alt="gif" className="h-36" />
          </div>
          {/* <CgProfile size={120} className="cursor-pointer text-[#574898]" /> */}
        </div>
        <div className="space-y-3 p-2 font-base mt-6 text-white">
          <p>
            <strong className=" capitalize">Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>
          <p className="capitalize">
            <strong>Address:</strong> {user.address}
          </p>
          <p className="capitalize">
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </div>
      {/* CUSTOMERS */}
      <div className=" bg-stone-700 bg-opacity-50 px-16 py-4 rounded-lg">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white font-serif text-3xl mb-3 font-semibold">My Customers</h1>
          <div className="rounded-full overflow-hidden">
            <img src="/gymmm.gif" alt="gif" className="h-36" />
          </div>
          {/* <CgProfile size={120} className="cursor-pointer text-[#574898]" /> */}
        </div>
        <div className="space-y-3 p-2 font-base mt-6 text-white">
          <p>
            <strong className=" capitalize">Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>
          <p className="capitalize">
            <strong>Address:</strong> {user.address}
          </p>
          <p className="capitalize">
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
