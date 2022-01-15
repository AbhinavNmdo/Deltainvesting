import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cources = (props) => {
  const initialClasses = [];
  const [classes, setClasses] = useState(initialClasses);

  // const host = "http://localhost:5000"
  // const host = "https://deltainvesting.herokuapp.com"
  const getClass = async () => {
    props.setProgress(50)
    const responce = await fetch(`${process.env.REACT_APP_HOSTURI}/api/courses`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await responce.json();
    props.setProgress(70)
    setClasses(json.classes);
    props.setProgress(100)
  }


  const toasting = () => {
    props.toast.warning('You need to Login First')
  }

  useEffect(() => {
    getClass();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {/* Courses Heading */}
      <div className="container mx-auto mt-6">
        <div className='w-fit mx-auto flex flex-col justify-center items-center'>
          <h1 className="text-center text-2xl lg:text-3xl">Courses</h1>
          <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
        </div>
      </div>


      {/* Courses Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
        {classes.map((classs) => {
          if (classs.category === 'primium') {
            if(!localStorage.getItem('auth-token')){
              return (
                <Link to='#' onClick={toasting}>
                  <div className="bg-white border-2 border-slate-200 mx-3 flex flex-col rounded-3xl">
                    <div className="p-3">
                      <img src={`../Images/upload/${classs.thumbnail}`} alt="Class" className="object-cover rounded-xl" />
                    </div>
                    <div className="px-8 flex flex-col justify-center items-center">
                      <h1 className="text-center text-2xl">{classs.name}</h1>
                      <span className="text-sm text-yellow-500 text-center">Primium</span>
                      <h1 className="text-slate-600 mt-3">Teach you About : Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit!</h1>
                    </div>
                    <div className="flex justify-between items-center px-8 mt-5 mb-4">
                      <h1>Duration : 2 hours</h1>
                      <h1 className="text-xl">₹ 2,000</h1>
                    </div>
                  </div>
                </Link>
              );
            }
            else{
              return (
                <Link to={`/courses/class/${classs._id}`}>
                  <div className="bg-white border-2 border-slate-200 mx-3 flex flex-col rounded-3xl">
                    <div className="p-3">
                      <img src={`../Images/upload/${classs.thumbnail}`} alt="Class" className="object-cover rounded-xl" />
                    </div>
                    <div className="px-8 flex flex-col justify-center items-center">
                      <h1 className="text-center text-2xl">{classs.name}</h1>
                      <span className="text-sm text-yellow-500 text-center">Primium</span>
                      <h1 className="text-slate-600 mt-3">Teach you About : Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit!</h1>
                    </div>
                    <div className="flex justify-between items-center px-8 mt-5 mb-4">
                      <h1>Duration : 2 hours</h1>
                      <h1 className="text-xl">₹ 2,000</h1>
                    </div>
                  </div>
                </Link>
              );
            }
          }
          else {
            return (
              // Courses Cards
              <Link to={`/courses/class/${classs._id}`}>
                <div className="bg-white border-2 border-slate-200 mx-3 flex flex-col rounded-3xl">
                  <div className="p-3">
                    <img src={`../Images/upload/${classs.thumbnail}`} alt="Class" className="object-cover rounded-xl" />
                  </div>
                  <div className="px-8 flex flex-col justify-center items-center">
                    <h1 className="text-center text-2xl">{classs.name}</h1>
                    <span className="text-sm text-green-500 text-center">Free</span>
                    <h1 className="text-slate-600 mt-3">Teach you About : Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit!</h1>
                  </div>
                  <div className="flex justify-between items-center px-8 mt-5 mb-4">
                    <h1>Duration : 2 hours</h1>
                    <h1 className="text-xl">₹ 2,000</h1>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

export default Cources;
