import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Signup = (props) => {
  // const host = "http://localhost:5000";
  const host = "https://deltainvesting.herokuapp.com"
  // const host = "https://deltainvesting.azurewebsites.net"
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    email: "", 
    phone: "",
    password: "",
    cpassword: ""
  });


  const handleOnChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleOnSubmit = async (e)=>{
    e.preventDefault();
    const responce = await fetch(`${host}/api/user/signup`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        companyName: credentials.companyName,
        address: credentials.address,
        email: credentials.email,
        phone: credentials.phone,
        password: credentials.password,
        cpassword: credentials.cpassword
      })
    });
    const json = await responce.json();
    if(json.success){
      history.push('/login')
    }
  }

  return (
    <>
      <div className="container my-4 p-3">
        <h1 align="center" style={{ marginBottom: "60px" }}>
          Register Yourself
        </h1>
        <form onSubmit={handleOnSubmit}>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <input
                  type="text"
                  id="firstname"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-control"
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              id="companyname"
              name="companyName"
              placeholder="Company Name"
              className="form-control"
              onChange={handleOnChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              placeholder="Address"
              onChange={handleOnChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="E-Mail"
              onChange={handleOnChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="number"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="Phone"
              onChange={handleOnChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleOnChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              className="form-control"
              placeholder="Confirm-Password"
              onChange={handleOnChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            SignUp
          </button>
        </form>
        <div className="text-center">
          <p>
            Already a member? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
