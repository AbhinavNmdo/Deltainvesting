import React from 'react';
import tarun from '../Images/pic.jpg'

const About = (props) => {
    
    return (
        <>
        <h1 align="center" className="m-5">About Us</h1>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-3 mb-5 d-flex flex-column justify-content-center align-items-center " style={{height:'auto'}}>
                    <div className="card me-3" style={{border: '1px solid grey', padding: '5px'}}>
                        <img align="center" src={tarun} alt=".." width="250" className="img-fluid mb-2"/>
                        <h5 align="center">Tarun Bhatia</h5>
                        <h6 align="center">CFA</h6>
                    </div>
                </div>
                <div className="col-md-9" style={{fontFamily: 'Dancing Script'}}>
                    <h3 style={{textAlign:'justify'}}>Delta investing academy is founded by CFA Tarun Bhatia a qualified Chartered Financial Analyst from ICFAI University, in year 2008 holding Diploma in Finance, Advance Diploma in Finance and Masters of Economics.</h3>
                    <br />
                    <h3 style={{textAlign:'justify'}}>The founder has potential of knowledge and experience in securities market of more than 14 years worked with an SEBI registered stock brokers for more than 11 years .</h3>
                    <br />
                    <h3 style={{textAlign:'justify'}}>The aim to form the academy is to provide a platform for the traders and the investors to provide the complete education about the stock market to meet their financial goals.</h3>
                </div>
            </div>
        </div>
        </>
    );
}

export default About
