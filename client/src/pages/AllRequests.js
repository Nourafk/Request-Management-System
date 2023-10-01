import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";
import { MdEdit } from "react-icons/md";

const AllRequests = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    //   const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        setLoading(true);
        const asyncFn = async () => {
            try {
                const res = await fetch(`http://localhost:2000/api/myRequests`, {
                    method: "GET",
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                if (!result.error) {
                    // console.log(result);
                    setRequests(result.requests);
                    setLoading(false);
                } else {
                    console.log(result);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        };
        asyncFn();

    }, []);

    return (
        <>
            <div>
                {/* <h3 style={{ textAlign: "center", marginTop: "10vh", paddingBottom: "6vh" }}>All Requests</h3> */}
                {loading ?
                    (<Spinner splash="Loading Requests..." />) :
                    (

                        <>
                            {requests.length == 0 ? (
                                <>
                                    <h3 style={{ textAlign: "center", marginTop: "10vh", paddingBottom: "6vh" }}>No requests created yet</h3>
                                    <center>
                                    <Link to="/create">
                                        <a className="btn btn-primary" style={{ width: "35vh", height: "7vh", fontSize: 15, textAlign: "center" }}>Create Request</a>
                                    </Link> </center>
                                    </>
                            ) : (
                                <>
                                 <h3 style={{ textAlign: "center", marginTop: "10vh"}}>All Requests</h3>
                                 <h6 style={{ textAlign: "center", marginTop: "1vh", paddingBottom: "6vh" }}> No. of requests: {requests.length}</h6>
                                    <table className="table table-hover" style={{ }}>
                                        <thead> 
                                            <tr className="table-active" style={{ textAlign: "center" }}>
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Creator</th>
                                                <th scope="col">Creation Date</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests?.map((Request) => (
                                                <tr style={{ textAlign: "center" }}
                                                    key={Request._id}
                                                    // onClick={() => {
                                                    //     setModalData({});
                                                    //     setModalData(Request);
                                                    //     // setShowModal(true);
                                                    // }}
                                                >
                                                    <th scope="row">{Request.title}</th>
                                                    <td>{Request.description}</td>
                                                    <td>{Request.status}</td>
                                                    <td>{Request.creatorName}</td>
                                                    <td>{Request.creationDate.toString().split('T')[0]}</td>
                                                    <td> <MdEdit 
                                                     onClick={() => {
                                                        setModalData({});
                                                        setModalData(Request);
                                                        setShowModal(true);
                                                    }}
                                                    // onClick={
                                                    //     // navigate('/edit')
                                                    //     // setShowModal(true)
                                                        
                                                    // }
                                                    /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div style={{

                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '30vh',
                                        // width:'100vh',
                                    }}>
                                        <Link to="/create">
                                            <a className="btn btn-primary" style={{ width: "35vh", height: "7vh", fontSize: 15, textAlign: "center" }}>Create Request</a>
                                        </Link>
                                    </div> </>

                            )}

                        </>

                    )}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalData.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        <strong>Description</strong>: {modalData.description}
                    </p>
                    <p>
                        <strong>Status</strong>: {modalData.status}
                    </p>
                    <p>
                        <strong>Creator</strong>: {modalData.creatorName}
                    </p>
                    <p>
                        <strong>Creation Date</strong>: {modalData.creationDate?.toString().split('T')[0]}
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
                        Edit
                    </Link>
                    {/* <button
                        className="btn btn-danger"
                        onClick={() => deleteContact(modalData._id)}
                    >
                        Delete
                    </button> */}
                    <button
                        className="btn btn-warning"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

        </>
        // <>
        //   <div>
        //     <h1>Your Requests</h1>
        //     <a href="/myRequests" className="btn btn-danger my-2">
        //       Reload Contact
        //     </a>
        //     <hr className="my-4" />
        //     {loading ? (
        //       <Spinner splash="Loading Contacts..." />
        //     ) : (
        //       <>
        //         {Requests.length == 0 ? (
        //           <h3>No requests created yet</h3>
        //         ) : (
        //           <>
        //             <form className="d-flex" onSubmit={handleSearchSubmit}>
        //               <input
        //                 type="text"
        //                 name="searchInput"
        //                 id="searchInput"
        //                 className="form-control my-2"
        //                 placeholder="Search Request"
        //                 value={searchInput}
        //                 onChange={(e) => setSearchInput(e.target.value)}
        //               />
        //               <button type="submit" className="btn btn-info mx-2">
        //                 Search
        //               </button>
        //             </form>

        //             <p>
        //               Your Total Requests: <strong>{Requests.length}</strong>
        //             </p>
        //             <table className="table table-hover">
        //               <thead>
        //                 <tr className="table-dark">
        //                   <th scope="col">Title</th>
        //                   <th scope="col">Description</th>
        //                   <th scope="col">Status</th>
        //                   {/* <th scope="col">Phone</th> */}
        //                 </tr>
        //               </thead>
        //               <tbody>
        //                 {Requests.map((Request) => (
        //                   <tr
        //                     key={Request._id}
        //                     onClick={() => {
        //                       setModalData({});
        //                       setModalData(Request);
        //                       setShowModal(true);
        //                     }}
        //                   >
        //                     <th scope="row">{Request.title}</th>
        //                     <td>{Request.description}</td>
        //                     <td>{Request.status}</td>
        //                     {/* <td>{contact.phone}</td> */}
        //                   </tr>
        //                 ))}
        //               </tbody>
        //             </table>
        //           </>
        //         )}
        //       </>
        //     )}
        //   </div>

        //   <Modal show={showModal} onHide={() => setShowModal(false)}>
        //     <Modal.Header closeButton>
        //       <Modal.Title>{modalData.title}</Modal.Title>
        //     </Modal.Header>

        //     <Modal.Body>
        //       <h3>{modalData.title}</h3>
        //       <p>
        //         <strong>Description</strong>: {modalData.description}
        //       </p>
        //       <p>
        //         <strong>Status</strong>: {modalData.status}
        //       </p>
        //       {/* <p>
        //         <strong>Phone Number</strong>: {modalData.phone}
        //       </p> */}
        //     </Modal.Body>

        //     <Modal.Footer>
        //       <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
        //         Edit
        //       </Link>
        //       {/* <button
        //         className="btn btn-danger"
        //         onClick={() => deleteContact(modalData._id)}
        //       >
        //         Delete
        //       </button> */}
        //       <button
        //         className="btn btn-warning"
        //         onClick={() => setShowModal(false)}
        //       >
        //         Close
        //       </button>
        //     </Modal.Footer>
        //   </Modal>
        // </>
    );
};

export default AllRequests;