import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import bull from '../Images/bullfinal.png'
import bear from '../Images/bearfinal.png'
import '../../node_modules/animate.css/animate.css';

const HomePage = (props) => {
  return (
    <>
      <div id="parent" style={{ height: "23rem" }}>
        <div
          id="header"
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "25rem" }}
        >
          <h1 align="center" style={{ color: "white", fontSize: '3rem' }}>
            Delta Investing Academy
          </h1>
          <p style={{ color: 'white', fontSize: '1.5rem' }}>सोच बदल जाएगी ...</p>
        </div>
        <div className="bullbear" style={{transform: 'translateY(10px)'}}>
          <img src={bull} alt=".." className="img-fluid bull animate__animated animate__slideInLeft" />
          <img src={bear} alt=".." className="img-fluid bear animate__animated animate__slideInRight" />
        </div>
      </div>
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-md-6">
            <div
              className="card"
              style={{
                width: "auto",
                boxShadow: "6px 5px 10px #888888",
                borderRadius: "10px",
                margin: "7px",
              }}
            >
              <div className="card-body" style={{ minHeight: '26ch' }}>
                <h4 className="card-title my-3" align="center">
                  Our Courses
                </h4>
                <p className="card-text">
                  We are here to provide the complete education for stock market, its an excellent platform for the beginners looking to adopt the market as career. Our courses will definitely change your life style and approach. We will make you so much enable to understand what actually is going on in the market, and how to make profits out of this dynamic market.
                </p>
              </div>
              <iframe
                width="auto"
                height="250"
                src="https://www.youtube.com/embed/djZdqF2H1ro"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="allowfullscreen"
                style={{ borderRadius: "10px" }}
              ></iframe>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card"
              style={{
                width: "auto",
                boxShadow: "6px 5px 10px #888888",
                borderRadius: "10px",
                margin: "7px",
              }}
            >
              <div className="card-body" style={{ minHeight: '26ch' }}>
                <h4 className="card-title my-3" align="center">
                  What is Stock Market?
                </h4>
                <p className="card-text">
                  Stock market is a venue where investors meet each others to buy and sell the securities on the platform of Stock Exchange for the in equity, derivative, Bonds, Mutual Funds, currency companies listed with Exchange.
                </p>
              </div>
              <iframe
                width="auto"
                height="250"
                src="https://www.youtube.com/embed/RslxPbz8_eM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="allowfullscreen"
                style={{ borderRadius: "10px" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "auto", minHeight: "80vh" }}
      >
        <div className="row">
          <div className="col-md-4">
            <div
              className="card m-4"
              style={{
                width: "auto",
                borderRadius: "10px",
                backgroundColor: "#f2f1ed",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Browse Lecture</h5>
                <h6 className="card-subtitle mb-2 text-muted">Videos</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link to="/cources" className="btn btn-primary">
                  Browse
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card m-4"
              style={{
                width: "auto",
                borderRadius: "10px",
                backgroundColor: "#f2f1ed",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Calculators</h5>
                <h6 className="card-subtitle mb-2 text-muted">Calculators</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link to="/calculators" className="btn btn-primary">
                  Go Ahead
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card m-4"
              style={{
                width: "auto",
                borderRadius: "10px",
                backgroundColor: "#f2f1ed",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Contact Us</h5>
                <h6 className="card-subtitle mb-2 text-muted">Contact</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link to="/" className="btn btn-primary">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
