import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "", 
    password: ""
  });

  const handleOnChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const host = "http://localhost:5000"
    // const host = "https://deltainvesting.herokuapp.com"
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
      setTimeout(() => {
        props.toast.success("Login Successfully")
      }, 300);
    }
    else{
      props.toast.error("Invalid Username or Password")
    }
  }

  return (
    <div className="container p-4 d-flex flex-column justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="card d-flex flex-column justify-content-center align-items-center" style={{borderRadius: '13px', boxShadow: '1px 1px 20px'}}>
          <h1 className="my-4">Login</h1>
          <form onSubmit={handleOnSubmit} style={{ width: '300px', padding: '10px' }}>
            <div className="form-outline mb-4">
              <input type="text" id="form2Example1" name="email" className="form-control" placeholder="E-Mail" onChange={handleOnChange} />
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="form2Example2" name="password" className="form-control" placeholder="Password" onChange={handleOnChange} />
            </div>

            <div className="row mb-4">

              <div className="col text-center">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>
            </div>

            <div className="text-center">
              <p>
                Not a member? <Link href="/signup">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
