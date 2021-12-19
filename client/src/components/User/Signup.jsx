import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
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


  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // const host = "http://localhost:5000"
  const host = "https://deltainvesting.herokuapp.com"
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch(`${host}/api/user/auth/signup`, {
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
    if (json.success) {
      navigate.push('/login')
      setTimeout(() => {
        props.toast.success("Registered")
      }, 300);
    }
    else {
      props.toast.error("Something Wrong")
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center user-back">
        <div className="container card p-3 w-50 center-card">
          <h1 className="center text-center mb-5">
            Register Yourself
          </h1>

          <form onSubmit={handleOnSubmit} className='p-2'>

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
                id="address"
                name="address"
                className="form-control"
                placeholder="Address"
                onChange={handleOnChange}
              />
            </div>

            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-outline">
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Mobile"
                    className="form-control"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-outline">
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Confirm-Password"
                    className="form-control"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary my-2 btn-block">
                Sign in
              </button>
            </div>
            
          </form>

          <div className="text-center mt-3">
            <p>
              Already a member? <Link to="/login">Login</Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;
