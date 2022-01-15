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
  // const host = "https://deltainvesting.herokuapp.com"
  const handleOnSubmit = async (e) => {
    props.setProgress(30)
    e.preventDefault();
    const responce = await fetch(`${process.env.REACT_APP_HOSTURI}/api/user/auth/signup`, {
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
        cpassword: credentials.cpassword,
        gender: credentials.gender
      })
    });
    props.setProgress(70)
    const json = await responce.json();
    props.setProgress(100)
    if (json.success) {
      navigate('/login')
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
      <div className="flex justify-center items-center h-[85vh] user-back">
        <div className="container card p-3 center-card lg:w-1/2">
          <div className="container mx-auto mb-8">
            <div className='w-fit mx-auto flex flex-col justify-center items-center'>
              <h1 className="text-center text-2xl lg:text-3xl">Register Yourself</h1>
              <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
            </div>
          </div>

          <form onSubmit={handleOnSubmit} className='p-2'>

            <div className="grid grid-cols-1 lg:grid-cols-2 mb-3">
              <div className="col-span-1">
                <div className="flex justify-center items-center mx-1.5 mb-3 lg:mb-0">
                  <input
                    type="text"
                    id="firstname"
                    name="firstName"
                    placeholder="First Name"
                    className="focus:outline-none w-full focus:ring rounded-full bg-slate-200 py-2 px-2"
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex justify-center items-center mx-1.5">
                  <input
                    type="text"
                    id="lastname"
                    name="lastName"
                    placeholder="Last Name"
                    className="focus:outline-none w-full focus:ring rounded-full bg-slate-200 py-2 px-2"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mx-1.5 mb-3">
              <input
                type="text"
                id="address"
                name="address"
                className="focus:outline-none w-full focus:ring rounded-full bg-slate-200 py-2 px-2"
                placeholder="Address"
                onChange={handleOnChange}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="col-span-1">
                <div className="flex justify-center items-center mx-1.5 mb-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="focus:outline-none w-full focus:ring rounded-full bg-slate-200 py-2 px-2"
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex justify-center items-center mx-1.5 mb-3 lg:mb-0">
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Mobile"
                    className="focus:outline-none w-full focus:ring rounded-full bg-slate-200 py-2 px-2"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 mb-3">
              <div className="col-span-1">
                <div className="flex justify-center items-center mx-1.5 mb-3 lg:mb-0">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="focus:outline-none w-full focus:ring rounded-full bg-slate-200 py-2 px-2"
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex justify-center items-center mx-1.5">
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Confirm-Password"
                    className="focus:outline-none w-full focus:ring rounded-full bg-slate-200 py-2 px-2"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start items-center mx-1.5 mb-3">
              <div className="mx-3">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="focus:outline-none rounded-full bg-slate-200 py-2 px-2"
                  value="male"
                  onChange={handleOnChange}
                />
                <label htmlFor="male" className="mx-1">Male</label>
              </div>
              <div className="mx-3">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="focus:outline-none rounded-full bg-slate-200 py-2 px-2"
                  value="female"
                  onChange={handleOnChange}
                />
                <label htmlFor="female" className="mx-1">Female</label>
              </div>
              <div className="mx-3">
                <input
                  type="radio"
                  id="others"
                  name="gender"
                  className="focus:outline-none rounded-full bg-slate-200 py-2 px-2"
                  value="others"
                  onChange={handleOnChange}
                />
                <label htmlFor="others" className="mx-1">Others</label>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="px-4 p-2 bg-blue-700 text-white rounded-2xl mb-3">
                Sign Up
              </button>
            </div>

          </form>

          <div className="text-center mt-3">
            <p>
              Already a member? <Link to="/login" className="text-blue-700 underline-offset-1 underline">Login</Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;
