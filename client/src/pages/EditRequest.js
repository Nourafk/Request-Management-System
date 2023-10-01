import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";

const EditRequest = () => {
    const { id } = useParams();
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const [RequestDetails, setRequestDetails] = useState({
        title: "",
        description: "",
        status: "",
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setRequestDetails({ ...RequestDetails, status: event.target.value });


    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(RequestDetails.status);


        const res = await fetch(`http://localhost:2000/api/editRequest/${id}`, {
            method: "PUT",
            headers: {
                // mode: 'no-cors',
                "Access-Control-Allow-Origin": "http://localhost:3000",
                // 'Access-Control-Allow-Credentials': 'true',
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(RequestDetails)
            
        });
        console.log("This is res body: "+res.body);
        
        const result = await res.json();
        console.log("This is result: "+result);
        if (!result.error) {
            toast.success(`Updated  ${RequestDetails.title} request`);
            setRequestDetails({ title: "", description: "", status: "" });
            navigate("/myRequests");
        } else {
            console.log(result);
            toast.error(result.error);
        }



    };

    useEffect(() => {
        setLoading(true);
        const asyncFn = async () => {
            try {
                const res = await fetch(`http://localhost:2000/api/request/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                setRequestDetails({
                    title: result.title,
                    description: result.description,
                    status: result.status,
                    creator: result.creator,
                    creationDate: result.creationDate,
                    creatorName: result.creatorName
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        asyncFn();

    }, []);



    return (
        <>
            {loading ? (
                <Spinner splash="Loading Requests..." />
            ) : (
                <>
                    <h3 style={{ textAlign: "center", marginTop: "10vh" }}>Edit Request</h3>
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
                                    // value={RequestDetails.title}
                                    // onChange={handleInputChange}
                                    placeholder={RequestDetails.title}
                                    disabled
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
                                    // value={RequestDetails.description}
                                    // onChange={handleInputChange}
                                    placeholder={RequestDetails.description}
                                    disabled
                                />
                            </div>
                            {/* <div className="form-group">
        <label htmlFor="creatorInput" className="form-label mt-4">
            Creator
        </label>
        <input
            type="text"
            className="form-control"
            id="creatorInput"
            name="creator"
            // value={RequestDetails.description}
            // onChange={handleInputChange}
            placeholder={RequestDetails.creatorName}
            disabled
        />
    </div> */}
                            <div class="form-group">
                                <label htmlFor="statusInput" class="form-label mt-4">Status</label>
                                <select className="form-control" id="statusSelect1" onChange={handleInputChange} name="status" value={RequestDetails.status} required>
                                    {/* disabled="true" value="Pending" */}
                                    <option value="" disabled="true">Choose status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In-progress">In-progress</option>
                                    <option value="Completed">Completed</option>

                                </select>
                            </div>
                            {/* <div className="form-group">
        <label htmlFor="creatorInput" className="form-label mt-4">
            Creator
        </label>
        <input
            type="text"
            className="form-control"
            id="creatorInput"
            name="creator"
            // value={RequestDetails.description}
            // onChange={handleInputChange}
            placeholder={RequestDetails.creatorName}
            disabled
        />
    </div> */}
                            {/* <div className="form-group">
        <label htmlFor="DateInput" className="form-label mt-4">
            Creation Date
        </label>
        <input
            type="text"
            className="form-control"
            id="DateInput"
            name="Date"
            // value={RequestDetails.description}
            // onChange={handleInputChange}
            placeholder={RequestDetails.creationDate?.toString().split('T')[0]}
            disabled
        />
    </div> */}

                            <center style={{ paddingTop: "3vh" }}>
                                <input
                                    type="submit"
                                    value="Save Changes"
                                    className="btn btn-primary my-2"
                                /> </center>
                            <p style={{ textAlign: "center", width: "60vh" }}></p>
                        </form> </div>
                </>
            )}

        </>
    );
};

export default EditRequest;