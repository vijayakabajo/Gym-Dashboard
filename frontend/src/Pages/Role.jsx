import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'
const Role = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-blue">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
        <h1 className="text-[2.5rem] font-semibold mb-6]">Sign In</h1>

        <div className="flex justify-around mt-7 mb-5">

          <div className="cursor-pointer flex flex-col items-center" onClick={()=>navigate("/login")}>
            <div className="bg-blue-500 p-6 rounded-full mb-2"><RiAdminFill style={{fontSize: '3.2rem'}}/> </div>
            <span className="font-medium">Admin</span>
          </div>

          <div className="cursor-pointer flex flex-col items-center" onClick={()=>navigate("/login")}>
            <div className="bg-blue-500 p-6 rounded-full mb-2"><IoPersonSharp style={{fontSize: '3.2rem'}}/></div>
            <span className="font-medium">Employee</span>
          </div>

        </div>
        <div className="text-[0.8rem] mb-3">Don't have an account? <span onClick={() => navigate("/signup")} className="text-blue-500 hover:underline hover:text-blue-700 cursor-pointer">Sign up</span></div>
      </div>
    </div>
  )
}

export default Role