import React, { useState } from "react";
import Navbar from "./Navbar";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';

function Login({ isSignup, onSubmit }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const responseMessage = (response) => {
    var decoded = jwt_decode(response.credential)
    onSubmit({ email: decoded.email })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if((!isSignup) || password === confirmPassword) {
      onSubmit({ password , username});
    } else {
      alert("Both Passwords are not same");
    }
  };


  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div>
      <Navbar />
      <div className="mt-[30%] sm:mt-[15%] md:mt-[13%] lg:mt-[9%]">
        <h1 className="text-fontwhite text-2xl ">{isSignup ? 'Sign Up' : 'Sign In'}</h1>
        <div className="">
          <form onSubmit={handleSubmit}>
            <input
              className="bg-lessblack mt-[10%] h-11 w-72 border border-fontwhite rounded-lg pl-5 text-fontwhite sm:mr-[2%] md:mt-[5%] lg:mt-[1%]"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="bg-lessblack mt-[6%] h-11 w-72 border border-fontwhite rounded-lg pl-5 text-fontwhite"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            { isSignup && <input
              type="password"
              className="bg-lessblack mt-[6%] h-11 w-72 border border-fontwhite rounded-lg pl-5 text-fontwhite sm:ml-[2%]"
              placeholder="Confirm Password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /> }
            <div>
             <button 
             type="submit"
             className="text-fontwhite mt-[10%] bg-custom-gradient h-10 w-72 rounded-lg sm:ml-[2%] sm:mt-[5%] lg:mt-[3%]">
            { isSignup ? 'Sign Up' : 'Sign In' }
          </button>
          </div>
          </form>
         

          <div className="justify-center ">
           <div className="flex w-[100%] justify-center">
            <hr className="text-lightgrey mt-[20%] w-[80%] sm:mt-[15%] md:mt-[10%] lg:mt-[7%]" />
            </div>
            <div className="flex w-[100%] justify-center mt-[5%] sm:mt-[4%] md:mt-[3%] lg:mt-[2%]">
            <h1 className="text-fontwhite text-sm">(or)</h1>
            </div>
          </div>
          <div className="flex justify-center mt-[10%] sm:mt-[7%] md:mt-[5%] lg:mt-[3%]">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
