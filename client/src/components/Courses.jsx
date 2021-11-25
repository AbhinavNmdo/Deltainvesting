import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cources = (props) => {
  const initialClasses = [];
  const [classes, setClasses] = useState(initialClasses);

  const host = "http://localhost:5000"
    // const host = "https://deltainvesting.herokuapp.com"
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

  const toasting = ()=>{
    props.toast.warning('You need to Login First')
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
            <div className="col-md-6" key={classs.name}>
            <div className="card mb-3" style={{ maxWidth: '540px', borderRadius: '13px', boxShadow: '1px 1px 10px 1px' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src="https://i.ytimg.com/vi/66zdcVQN9aE/maxresdefault.jpg" className="img-fluid" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '13px' }} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{classs.name}</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem iusto autem quod unde consectetur vel neque fuga eligendi itaque sed.
                    </p>
                    <p className="card-text">
                      {classs.category == 'primium' ? <span className="badge bg-warning text-dark">Primium</span> : <small className="text-muted">Normal</small>}
                    </p>
                    {(() => {
                      if (classs.category == 'primium') {
                        if (localStorage.getItem('auth-token')) {
                          return (
                            <Link to={`/courses/class/${classs._id}`}><a className="stretched-link"></a></Link>
                          )
                        }
                        else {
                          return (
                            <Link to="#"><a onClick={toasting} className="stretched-link"></a></Link>
                          )
                        }
                      }
                      else {
                        return (
                          <Link to={`/courses/class/${classs._id}`}><a className="stretched-link"></a></Link>
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
