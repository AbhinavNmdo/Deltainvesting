import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../Style/user.css'

const Login = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // const host = "http://localhost:5000"
  // const host = "https://deltainvesting.herokuapp.com"

  const handleOnSubmit = async (e) => {
    props.setProgress(40)
    e.preventDefault();
    const responce = await fetch(`${process.env.REACT_APP_HOSTURI}/api/user/auth/login`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    props.setProgress(70)
    const json = await responce.json();
    if (json.success) {
      localStorage.setItem('auth-token', json.authtoken_login);
      props.setProgress(100)
      navigate('/')
      setTimeout(() => {
        props.toast.success("Login Successfully")
      }, 300);
    }
    else if(json.adminSuccess){
      localStorage.setItem('admin_auth_token', json.admin_auth)
      props.setProgress(100);
      navigate('/admin');
      setTimeout(() => {
        props.toast.success('Welcome Admin');
      }, 300);
    }
    else {
      props.setProgress(100)
      props.toast.error("Invalid Username or Password")
    }

  }

  return (
    <div className="flex justify-center items-center user-back h-[85vh]">
      <div>
        <div className="container mx-auto p-3 center-card">
          <div className="container mx-auto mb-8">
            <div className='w-fit mx-auto flex flex-col justify-center items-center'>
              <h1 className="text-center text-2xl lg:text-3xl">User Login</h1>
              <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
            </div>
          </div>
          <form onSubmit={handleOnSubmit} className='p-2'>

            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-1">Email :</label>
              <input type="text" id="email" name="email" className="focus:outline-none focus:ring rounded-full bg-slate-200 py-2 px-2" placeholder="E-Mail" onChange={handleOnChange} />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-1">Password :</label>
              <input type="password" id="password" name="password" className="focus:outline-none focus:ring rounded-full bg-slate-200 py-2 px-2" placeholder="Password" onChange={handleOnChange} />
            </div>

            <div className="row mb-4">
              <div className="col text-center">
                <Link to="/forgot-password" className="text-blue-800">Forgot password?</Link>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="px-4 p-2 bg-blue-700 text-white rounded-2xl mb-3">
                Sign in
              </button>
            </div>

            <div className="text-center">
              <p>
                Not a member? <Link to="/signup" className="text-blue-700 underline-offset-1 underline">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
