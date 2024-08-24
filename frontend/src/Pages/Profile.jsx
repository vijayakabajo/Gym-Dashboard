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
    <div className="flex  flex-col justify-center items-center w-full h-full bg-slate-200">
      <div className="flex justify-center items-center">
        <CgProfile size={120} className="cursor-pointer text-[#574898]" />
      </div>
      <div className="space-y-3 p-2 font-base mt-6">
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
  );
};

export default Profile;
