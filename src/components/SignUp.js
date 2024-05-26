import React from 'react'
import Login from './Login'
import { useDispatch } from 'react-redux';
import { registerUser } from '../slice/SignupSlice';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
     dispatch(registerUser(event)).then((result) => {
      if(result.payload.message === "Username Already Exists")
        alert(result.payload.message + " Please Login or Choose another Username");
      else if(result.payload.message === "User Registered, Login With Same Credentials"){
        alert(result.payload.message);
        navigate('/signin')
        
      }


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
