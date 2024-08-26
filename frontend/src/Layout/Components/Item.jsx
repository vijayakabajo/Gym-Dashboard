import React from "react";
import {useNavigate} from "react-router-dom"
const Item = (props) => {
const navigate = useNavigate();
  return (
    <div className="bg-stone-700 bg-opacity-50  text-white shadow-lg rounded-lg pl-2 py-6 pr-4 flex flex-col items-center">
      <div className="bg-blue-500 p-4 rounded-full">
        <props.data.img className="w-20 h-20"/>
      </div>

      <div className="ml-4 flex-1 text-center">
        <h3 className="text-[1.5rem] font-semibold mb-1">{props.data.name}</h3>
        <p className="text-gray-600">Manage all your {props.data.name}</p>
      </div>

      <button className="py-2 px-3 mt-2 rounded-lg bg-stone-800 hover:bg-opacity-80 bg-opacity-50" onClick={()=>navigate(props.data.redirectURL)}>
        {
            (props.data.name==="Revenue")?<>Show Total Revenue</>:
            <>
                Show All {props.data.name}
            </>
        }

        {/* Show All {props.data.name} */}
        
      </button>
    </div>
  );
};

export default Item;
