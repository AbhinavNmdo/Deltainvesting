import React from 'react';
import tarun from '../Images/pic.jpg'

const About = (props) => {

    return (
        <>
            {/* About Heading */}
            <div className="container mx-auto mt-6">
                <div className='w-fit mx-auto flex flex-col justify-center items-center'>
                    <h1 className="text-center text-2xl lg:text-3xl">About Us</h1>
                    <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
                </div>
            </div>



            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 my-6">
                <div className='flex items-center justify-center flex-col'>
                    <div className='flex items-center justify-center flex-col border-2 p-3 rounded-2xl border-slate-200'>
                        {/* <img src={eleReview.gender === 'male' ? male : female} alt="" /> */}
                        <img src={tarun} alt="tarun" className="rounded-3xl w-72 border-2 border-slate-200" />
                        <h1 className='text-xl mt-3'>Tarun Bhatia</h1>
                        <h1>CFA</h1>
                    </div>
                </div>
                <div className='col-span-2 rounded-r-full rounded'>
                    {/* About Content  */}
                    <div className="container mx-auto px-5 md:px-10 lg:px-32 lg:pl-10 mt-10 mb-20">
                        <h1 className='text-xl text-justify'>Investing Delta Academy is founded by CFA Tarun Bhatia a qualified Chartered Financial Analyst from ICFAI University, in year 2008 holding Diploma in Finance, Advance Diploma in Finance and Masters of Economics.</h1>
                        <br />
                        <h1 className='text-xl text-justify'>The founder has potential of knowledge and experience in securities market of more than 14 years worked with an SEBI registered stock brokers for more than 11 years .</h1>
                        <br />
                        <h1 className='text-xl text-justify'>The aim to form the academy is to provide a platform for the traders and the investors to provide the complete education about the stock market to meet their financial goals.</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About
