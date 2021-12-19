import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    e.preventDefault();
    toggle();
    localStorage.clear();
    navigate('/login');
    setTimeout(() => {
      props.toast.warning("Logout Success")
    }, 300);
  }

  return (
    <>
      <div style={{
        height: "4rem", transition: "all"
      }}>
        <nav
          id="navbar"
          className={`navbar navbar-expand-lg navbar-dark ${location.pathname !== "/" ? "bg-dark" : ""
            } ${nav} ${burger}`}
          style={{
            backgroundColor:
              location.pathname === "/" ? "rgba(255, 255, 255, 0)" : "#212529",
            transition: "all",
            transitionDuration: location.pathname === '/' ? "0.5s" : 'unset',
            zIndex: '100'
          }}
        >
          <div className="container-fluid">
            <Link key="home" className="navbar-brand" to="/">
              <h3 className="pt-1">Delta Investing</h3>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleOnClick}
              ref={ref}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    key="home"
                    className={`nav-link ${location.pathname === "/" ? "active" : ""
                      }`}
                    aria-current="page"
                    to="/"
                    onClick={toggle}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    key="about"
                    className={`nav-link ${location.pathname === "/about" ? "active" : ""
                      }`}
                    to="/about"
                    onClick={toggle}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    key="calc"
                    className={`nav-link ${location.pathname === "/calculators" ? "active" : ""
                      }`}
                    to="/courses"
                    onClick={toggle}
                  >
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    key="review"
                    className={`nav-link ${location.pathname === "/reviews" ? "active" : ""
                      }`}
                    to="/reviews"
                    onClick={toggle}
                  >
                    Reviews
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Calculators
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/calculators/reversal" onClick={toggle}>
                        Reversal Calculator
                      </Link>
                    </li>
                    <li>
                      <Link
                        key="cources"
                        className="dropdown-item"
                        to="/calculators/optionprice"
                        onClick={toggle}
                      >
                        Option Price Calculator
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/calculators/niftyrange" onClick={toggle}>
                        Nifty Range Calculator
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/calculators/camarilla" onClick={toggle}>
                        Camarilla Calculator
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {localStorage.getItem("auth-token") ? (
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              ) : (
                <form className="d-flex">
                  <Link to="/login" className="btn btn-info mx-1" onClick={toggle}>
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-info mx-1" onClick={toggle}>
                    SignUp
                  </Link>
                </form>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
