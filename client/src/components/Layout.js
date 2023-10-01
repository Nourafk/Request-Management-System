import { Link } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../context/AuthContext";


const Layout = ({ children }) => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    return (<>
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" style={{ height: "13vh" }}>
            <div class="container-fluid">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <a class="navbar-brand">Request Management System </a> </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav ms-auto">
                        {user ? (
                            <>
                                {/* <li className="nav-item">
                                        <Link to="/myRequests">
                                            <a className="nav-link">All Requests</a>
                                        </Link>
                                    </li>
                                <li className="nav-item">
                                    <Link to="/create">
                                        <a className="nav-link">Create</a>
                                    </Link>
                                </li> */}
                                <li
                                    className="nav-item"
                                    onClick={() => {
                                        setUser(null);
                                        localStorage.clear();
                                        toast.success("Logged out.");
                                        navigate("/login", { replace: true });
                                    }}
                                >
                                    <button className="nav-link">Logout</button>

                                    {/* <button className="btn btn-danger">Logout</button> */}
                                </li>
                            </>

                        ) : (
                            <>
                                {/* <li className="nav-item">
                                    <Link to="/Login" style={{textDecoration: 'none'}}>
                                        <a className="nav-link" >Login</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Register" style={{textDecoration: 'none'}}>
                                        <a className="nav-link" >Register</a>
                                    </Link>
                                </li> */}
                            </>
                        )}



                    </ul>
                </div>
            </div>
        </nav>
        <div className="container mt-3">{children}</div>

    </>


    );
};
export default Layout;