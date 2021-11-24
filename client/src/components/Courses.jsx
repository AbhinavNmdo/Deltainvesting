import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cources = (props) => {
  // const host = "http://localhost:5000";
  const host = "https://deltainvesting.herokuapp.com"
  // const host = "https://deltainvesting.azurewebsites.net"
  const initialClasses = [];
  const [classes, setClasses] = useState(initialClasses);

  const getClass = async ()=>{
    const responce = await fetch(`${host}/api/class/allclass`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await responce.json();
    setClasses(json);
  }

  useEffect(() => {
    getClass();
  })

  return (
    <div className="container my-4">
      <h1 style={{textAlign: 'center', margin: '65px'}}>Courses Available</h1>
      <div className="row">
        {classes.map((classs)=>{
          return (
          <div className="col-md-6">
          <div className="card mb-3" style={{maxWidth: '540px'}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src="https://i.ytimg.com/vi/66zdcVQN9aE/maxresdefault.jpg" className="img-fluid rounded-start" alt="..." style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{classs.name}</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem iusto autem quod unde consectetur vel neque fuga eligendi itaque sed.
                  </p>
                  <p className="card-text">
                  {classs.category === 'primium'?<span class="badge bg-warning text-dark">Primium</span>:<small className="text-muted">Normal</small>}
                  </p>
                  {/* {classs.category === 'normal'?<Link to={`/class/${classs._id}`} className="stretched-link"></Link>:<Link to="/login" className="stretched-link"></Link>} */}
                  {/* {localStorage.getItem('auth-token')?<Link to={`/class/${classs._id}`} className="stretched-link"></Link>:<Link to="/login" className="stretched-link"></Link>} */}
                  {(()=>{
                    if (classs.category === 'primium') {
                      if(localStorage.getItem('auth-token')){
                        return(
                          <Link to={`/class/${classs._id}`} className="stretched-link"></Link>
                        )
                      }
                      else{
                        return(
                          <Link to="/login" className="stretched-link"></Link>
                        )
                      }
                    }
                    else{
                      return(
                        <Link to={`/class/${classs._id}`} className="stretched-link"></Link>
                      )
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
        )})}
      </div>
    </div>
  );
};

export default Cources;
