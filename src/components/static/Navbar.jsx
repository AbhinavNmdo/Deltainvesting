import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../Images/logo2.png';
import './Navbar.css';

const Navbar = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [nav, setNav] = useState("");
  const [burger, setBurger] = useState("");
  const [expand, setExpand] = useState(false);
  const ref = useRef(null);

  const handleOnScroll = () => {
    if (location.pathname === "/") {
      if (window.scrollY >= 450) {
        setNav("bg-dark fixed-top");
      } else {
        setNav("");
      }
    } else {
      setNav("fixed-top");
    }
  };

  const handleOnClick = () => {
    setExpand(true);
    if (burger === "bg-dark") {
      setBurger("");
    } else {
      setBurger("bg-dark");
    }
  };
  window.addEventListener("scroll", handleOnScroll);

  const toggle = () => {
    if (expand) {
      ref.current.click();
      setExpand(false);
    }
  }

  const handleLogout = (e) => {
    props.setProgress(30)
    e.preventDefault();
    toggle();
    localStorage.clear();
    props.setProgress(70)
    navigate('/login');
    props.setProgress(100)
    setTimeout(() => {
      props.toast.warning("Logout Success")
    }, 300);
  }

  return (
    <>
      <div className="nav">
        <div className="navbar">
          <div className="brand">
            <div className="logo">
              <img src={logo} alt="investingdelta" width={80} />
            </div>
            <div className="brand-heading">
              <h1>Investing Delta</h1>
            </div>
            <div className="hamburger">
              <button>Menu</button>
            </div>
          </div>
          <div className="content">
            <ul>
              <li><Link className={`${location.pathname === '/' ? 'text-slate-900' : 'text-slate-600'}`} to="/">Home</Link></li>
              <li><Link className={`${location.pathname === '/about' ? 'text-slate-900' : 'text-slate-600'}`} to="/about">About</Link></li>
              <li><Link className={`${location.pathname === '/courses' ? 'text-slate-900' : 'text-slate-600'}`} to="/courses">Courses</Link></li>
              <li><Link className={`${location.pathname === '/calculators' ? 'text-slate-900' : 'text-slate-600'}`} to="/calculators">Calculators</Link></li>
              <li><Link className={`${location.pathname === '/reviews' ? 'text-slate-900' : 'text-slate-600'}`} to="/reviews">Reviews</Link></li>
            </ul>
          {(() => {
            if (!localStorage.getItem('auth-token')) {
              return (
                <div className="flex justify-center items-center flex-row">
                  <Link className={`px-4 py-2 text-white rounded-2xl bg-indigo-600 mx-1 ring-indigo-500 ring-offset-1 ${location.pathname === '/login' ? 'ring' : ''}`} to="/login">Login</Link>
                  <Link className={`px-4 py-2 text-white rounded-2xl bg-indigo-600 mx-1 ring-indigo-500 ring-offset-1 ${location.pathname === '/signup' ? 'ring' : ''}`} to="/signup">Signup</Link>
                </div>
              )
            }
            else {
              return (
                <div className="flex justify-center items-center">
                  <Link to="#" onClick={handleLogout} className="px-4 py-2 text-white bg-red-600 rounded-2xl">Logout</Link>
                </div>
              );
            }
          })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
