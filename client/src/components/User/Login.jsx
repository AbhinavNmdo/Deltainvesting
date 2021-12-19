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
  const host = "https://deltainvesting.herokuapp.com"

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch(`${host}/api/user/auth/login`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await responce.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('auth-token', json.authtoken_login);
      navigate('/')
      setTimeout(() => {
        props.toast.success("Login Successfully")
      }, 300);
    }
    else {
      props.toast.error("Invalid Username or Password")
    }
  }

  return (
    <div className="user-back">
      <div className="center">
        <div className="container p-3 center-card">
          <h1 className="text-center mb-5">Login</h1>
          <form onSubmit={handleOnSubmit} className='p-2'>

            <div className="form-outline mb-4">
              <input type="text" id="form2Example1" name="email" className="form-control" placeholder="E-Mail" onChange={handleOnChange} />
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="form2Example2" name="password" className="form-control" placeholder="Password" onChange={handleOnChange} />
            </div>

            <div className="row mb-4">
              <div className="col text-center">
                <a href="/forgot-password">Forgot password?</a>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>
            </div>

            <div className="text-center">
              <p>
                Not a member? <Link to="/signup">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
