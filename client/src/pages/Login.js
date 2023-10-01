import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
    const { toast } = useContext(ToastContext);
    const { loginUser } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!credentials.username || !credentials.password) {
            toast.error("please enter all the required fields!");
            return;
        }

        loginUser(credentials);

    };
    return (
        <>
            {/* <ToastContainer  autoClose={2000}/> */}
            <h3 style={{ textAlign: "center", marginTop: "15vh" }}>Login</h3>

            <div style={{

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                // width:'100vh',
            }}>
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="UsernameInput" className="form-label mt-4">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="UsernameInput"
                            aria-describedby="UsernameHelp"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            placeholder="Enter Username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput" className="form-label mt-4">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            placeholder="Enter Password"
                            required
                        />
                    </div >
                    <center>
                        <input type="submit" value="Login" className="btn btn-primary my-3" />
                    </center>
                    <p style={{ textAlign: "center",width:"60vh"}}>
                        Don't have an account ? <Link to="/Register">Create an account</Link>
                    </p>
                </form>
            </div>
        </>
    );

};
export default Login;
