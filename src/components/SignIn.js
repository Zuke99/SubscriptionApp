import React from 'react'
import Login from './Login'
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../slice/SignupSlice';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmission = (data) => {
    if(data?.email){
      dispatch(registerUser(data)).then((result) => {
       handleLogin(data);
      })
    } else {
    handleLogin(data);
    }
}
  const handleLogin = (data) => {
    dispatch(loginUser(data)).then((result) => {
      if(result.payload.message === "User Loggedin Successfully"){
        localStorage.setItem("user", result.payload.data)
       navigate("/view-posts")
      } else {
        alert(result.payload.message)
      }
    })
  }
  return (
    <div>
        <Login isSignup={false} onSubmit={handleSubmission}/>
    </div>
  )
}

export default SignIn
