import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <center>
      <div className="jumbotron">
        <h3 style={{ textAlign: "center", marginTop: "10vh" }}>Welcome {user ? user.name : null}</h3>
        {/* <hr className="my-4" /> */}
        <div style={{display: 'flex' ,alignItems: 'center',
                        justifyContent: 'center',
                        height:"30vh"}}>
          <Link to="/myRequests">
            <a className="btn btn-primary" style={{ width: "35vh", height: "7vh", fontSize:15, textAlign:"center" }}>View All Requests</a>
          </Link> 
          <div style={{width: '10vh'}}></div>
        
          <Link to="/create">
            <a className="btn btn-primary" style={{ width: "35vh", height: "7vh", fontSize:15, textAlign:"center" }}>Create Request</a>
          </Link>
        </div>
        {/* <p>
          <Link to="/create">
            <a className="btn btn-info">Create</a>
          </Link>
        </p> */}
        {/* <a className="btn btn-info" href="#" role="button">
          Add Contacts
        </a> */}
      </div>
    </center>
  );
};

export default Home;