import React from 'react'
import Login from './Login'
import { useDispatch } from 'react-redux';
import { registerUser } from '../slice/SignupSlice';

function SignUp() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
  console.log(event)
     dispatch(registerUser(event)).then((result) => {
      if(result.payload.message === "Username Already Exists")
        alert(result.payload.message + " Please Login or Choose another Username");
      else if(result.payload.message === "User Registered Successfully")
        alert(result.payload.message);
    });
  };


  return (
    <div>
      <Login 
      isSignup={true}
      onSubmit={handleSubmit}
      />
    </div>
  )
}

export default SignUp
