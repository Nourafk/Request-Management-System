import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateRequest = () => {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const [RequestDetails, setRequestDetails] = useState({
        title: "",
        description: "",
        status: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "status") {
            setRequestDetails({ ...RequestDetails, status: event.target.value });

        }
        else
            setRequestDetails({ ...RequestDetails, [event.target.name]: event.target.value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:2000/api/newRequest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(RequestDetails),
        });
        const result = await res.json();
        if (!result.error) {
            toast.success(`Created ${RequestDetails.title} request`);
            navigate("/myRequests");
            setRequestDetails({ title: "", description: "", status: "" });
        } else {
            console.log(result);
            toast.error(result.error);
        }
    };


    return (
        <>
            <h3 style={{ textAlign: "center", marginTop: "10vh" }}>Create Request</h3>
            <div style={{

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                // width:'100vh',
            }}>


                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titleInput" className="form-label mt-4">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="titleInput"
                            name="title"
                            value={RequestDetails.title}
                            onChange={handleInputChange}
                            placeholder="Enter request title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptionInput" className="form-label mt-4">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="descriptionInput"
                            name="description"
                            value={RequestDetails.description}
                            onChange={handleInputChange}
                            placeholder="Enter description"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label htmlFor="statusInput" class="form-label mt-4">Status</label>
                        <select className="form-control" id="statusSelect1" onChange={handleInputChange} name="status" value={RequestDetails.status} placeholder="Choose status" required>
                            {/* disabled="true" value="Pending" */}
                            <option value="" disabled={true}>Choose status</option>
                            <option value="Pending">Pending</option>
                            <option value="In-progress">In-progress</option>
                            <option value="Completed">Completed</option>

                        </select>
                    </div>


                    <center style={{ paddingTop: "3vh" }}>
                        <input type="submit" value="Create Request" className="btn btn-primary my-2" />
                    </center>
                    <p style={{ textAlign: "center", width: "60vh" }}></p>
                </form>
            </div>
        </>
    );
};

export default CreateRequest;