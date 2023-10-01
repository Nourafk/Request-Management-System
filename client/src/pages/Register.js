import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Register = () => {
    const { toast } = useContext(ToastContext);
    const { registerUser } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!credentials.name || !credentials.username || !credentials.password || !credentials.confirmPassword) {
            toast.error("please enter all the required fields!");
            return;
        }


        if (credentials.password !== credentials.confirmPassword) {
            toast.error("password do not match!");
            return;
        }

        const userData = { ...credentials, confirmPassword: undefined };
        registerUser(userData);

    };

    return (
        <>
            {/* <ToastContainer  autoClose={2000}/> */}
            <h3 style={{ textAlign: "center", marginTop: "10vh" }}>Create an account</h3>

            <div style={{

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '85vh',
              

            }}>
               
                 <form onSubmit={handleSubmit} >
                 <div className="form-group">
                        <label htmlFor="NameInput" className="form-label mt-4">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="NameInput"
                            aria-describedby="NameHelp"
                            name="name"
                            value={credentials.name}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                            required
                        />
                    </div>
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="ConfirmpasswordInput" className="form-label mt-4">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPasswordInput"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                     <center>
                        <input type="submit" value="Register" className="btn btn-primary my-3" />
                    </center>
                    <p style={{ textAlign: "center",width:"60vh"}}>
                    Already have an account ? <Link to="/Login"> Login </Link>
                    </p>
                    {/* <p>
                        Already have an account ? <Link to="/Register">Login</Link>
                    </p> */}
                </form>
            </div>
        </>
    );

};
export default Register;
