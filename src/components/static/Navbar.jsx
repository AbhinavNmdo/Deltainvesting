import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../Images/logo2.png';
import './Navbar.css';

const Navbar = (props) => {
  const navigate = useNavigate();
  let location = useLocation();

  const handleLogout = (e) => {
    props.setProgress(30)
    e.preventDefault();
    toggleNav();
    localStorage.clear();
    props.setProgress(70)
    navigate('/login');
    props.setProgress(100)
    setTimeout(() => {
      props.toast.warning("Logout Success")
    }, 300);
  }

  const toggleNav = () => {
    const navbar = document.querySelector('.content');
    navbar.classList.toggle('active');
    const btn = document.querySelector(".fancy-burger");
    btn.querySelectorAll("span").forEach((span) => span.classList.toggle("open"));
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
            <div className="hamburger" onClick={toggleNav}>
              <button class="fancy-burger">
                <span class="box"></span>
                <span class="rectangle rectangle--top rectangle--small"></span>
                <span class="rectangle rectangle--middle"></span>
                <span class="rectangle rectangle--bottom rectangle--small"></span>
              </button>
            </div>
          </div>
          <div className="content">
            <ul>
              <li><Link onClick={toggleNav} className={`${location.pathname === '/' ? 'text-slate-900' : 'text-slate-600'}`} to="/">Home</Link></li>
              <li><Link onClick={toggleNav} className={`${location.pathname === '/about' ? 'text-slate-900' : 'text-slate-600'}`} to="/about">About</Link></li>
              <li><Link onClick={toggleNav} className={`${location.pathname === '/courses' ? 'text-slate-900' : 'text-slate-600'}`} to="/courses">Courses</Link></li>
              <li><Link onClick={toggleNav} className={`${location.pathname === '/calculators' ? 'text-slate-900' : 'text-slate-600'}`} to="/calculators">Calculators</Link></li>
              <li><Link onClick={toggleNav} className={`${location.pathname === '/reviews' ? 'text-slate-900' : 'text-slate-600'}`} to="/reviews">Reviews</Link></li>
            </ul>
            {(() => {
              if (!localStorage.getItem('auth-token')) {
                return (
                  <div className="flex justify-center items-center flex-row mt-7 lg:mt-0">
                    <Link onClick={toggleNav} className={`px-4 py-2 text-white rounded-2xl bg-indigo-600 mx-1 ring-indigo-500 ring-offset-1 ${location.pathname === '/login' ? 'ring' : ''}`} to="/login">Login</Link>
                    <Link onClick={toggleNav} className={`px-4 py-2 text-white rounded-2xl bg-indigo-600 mx-1 ring-indigo-500 ring-offset-1 ${location.pathname === '/signup' ? 'ring' : ''}`} to="/signup">Signup</Link>
                  </div>
                )
              }
              else {
                return (
                  <div className="flex justify-center items-center mt-7 lg:mt-0">
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
