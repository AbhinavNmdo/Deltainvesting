import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const host = "http://localhost:5000";
  // const host = "https://deltabackendservice.herokuapp.com"
  // const host = "https://deltainvesting.azurewebsites.net"
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "", 
    password: ""
  });

  const handleOnChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleOnSubmit = async (e)=>{
    e.preventDefault();
    const responce = await fetch(`${host}/api/user/login`, {
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
    if(json.success){
      localStorage.setItem('auth-token', json.authtoken_login);
      history.push('/')
    }
  }

  return (
    <div className="container my-4 p-4 d-flex flex-column justify-content-center align-items-center" style={{height: '90vh'}}>
      <h1 className="my-4">Login</h1>
      <form onSubmit={handleOnSubmit}>
        <div className="form-outline mb-4">
          <input type="text" id="form2Example1" name="email" className="form-control" placeholder="E-Mail" onChange={handleOnChange} />
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" name="password" className="form-control" placeholder="Password" onChange={handleOnChange} />
        </div>

        {/* <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example34"
              />
              <label className="form-check-label" htmlFor="form2Example34">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div> */}

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <Link to="/signup">Register</Link>
          </p>
          {/* <p>or sign up with:</p>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
