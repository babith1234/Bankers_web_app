import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [bank_name, setBank] = useState("");
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () =>{
    if(bank_name==="CANARA" && secret==="12345"){
        alert("Successfull")
        navigate("/search")
    }
  }

  return (
    <>
   
      <div className="flex justify-center items-center bg-green-500 h-screen">
      <h1 className="text-5xl justify-center">EMPLOYEE LOGIN</h1>
        {/* Display the image above the form on mobile view */}

        <form className="w-full m-5 sm:w-96 bg-crimson p-6 rounded-xl shadow-black-500 shadow-xl mb-20">
          <div className="mb-3">
            <label className="font-monospace font-bold mb-2 flex text-white">
              Bank name
            </label>
            <input
              type="text"
              placeholder="Enter Bank name"
              className="w-full border rounded-md bg-white border-gray-400 p-3"
              name="email_id"
              value={bank_name}
              onChange={(e) => setBank(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className=" mb-2 font-monospace font-bold flex  text-white">
              Bank Secret key
            </label>
            <input
              type="password"
              placeholder="Enter Secret key"
              className="w-full border rounded-md bg-white border-gray-400 p-3"
              name="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-6"></div>
          <button className="block bg-white text-crimson  hover:bg-green-500 w-full py-2 px rounded"onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
