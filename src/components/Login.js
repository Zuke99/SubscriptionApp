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
      <div className="mt-[30%] ">
        <h1 className="text-fontwhite text-2xl">{isSignup ? 'Sign Up' : 'Sign In'}</h1>
        <div className="">
          <form onSubmit={handleSubmit}>
            <input
              className="bg-lessblack mt-[10%] h-11 w-72 border border-fontwhite rounded-lg pl-5 text-fontwhite"
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
              className="bg-lessblack mt-[6%] h-11 w-72 border border-fontwhite rounded-lg pl-5 text-fontwhite"
              placeholder="Confirm Password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /> }
             <button 
             type="submit"
             className="text-fontwhite mt-[10%] bg-custom-gradient h-10 w-72 rounded-lg">
            { isSignup ? 'Sign Up' : 'Sign In' }
          </button>
          </form>
         

          <div className="justify-center ">
           <div className="flex w-[100%] justify-center">
            <hr className="text-lightgrey mt-[20%] w-[80%]" />
            </div>
            <div className="flex w-[100%] justify-center mt-[5%]">
            <h1 className="text-fontwhite text-sm">(or)</h1>
            </div>
          </div>
          <div className="flex justify-center mt-[10%]">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
