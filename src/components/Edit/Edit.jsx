import "./Edit.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
  },
};

const Edit = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [customerDetails, setcustomerDetails] = useState({});

  const [displayDetails, setDisplayDetails] = useState({});

  const [selectedUserMail, setselectedUserMail] = useState();

  const handleChange = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const details = {
      email: formData.get("exampleInputEmail1"),
      address: formData.get("exampleInputAddress"),
      adhaarCard: formData.get("exampleInputAdhaar"),
      phoneNo: formData.get("exampleInputMobile"),
    };

    sendValues(details)
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://inquisitive-bear-gaiters.cyclic.app/customerDetails/"
        );
        setcustomerDetails(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const setAndOpen = (email, adhaarCard, address, phoneNo) => {
    setDisplayDetails({ email, adhaarCard, address, phoneNo });
    setselectedUserMail(email);
    setIsOpen(true);
  };

  const sendValues = async (details) => {
    const data = {
      email: details.email,
      phoneNo: details.phoneNo,
      address: details.address,
      adhaarCard: details.adhaarCard,
    };
    try {
      const response = await axios.post(
        "https://inquisitive-bear-gaiters.cyclic.app/customerDetails/updateDetails",
        data
      );
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setIsOpen(false);
      refreshPage();
    }, 2000);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const displayCustomerDetails = Object.entries(customerDetails).map(
    ([key, item]) => (
      <li
        className="list-group-item list-group-item-action list-group-item-edit"
        key={key}
      >
        <div>
          <span>Name: {item.name}</span>
          <span>Email: {item.email}</span>
          <span>Mobile No: {item.phoneNo}</span>
          <span>Adhaar Card: {item.adhaarCard}</span>
          <span>Address: {item.address}</span>
        </div>
        <button
          className="btn btn-danger btn-edit-details"
          onClick={() =>
            setAndOpen(item.email, item.adhaarCard, item.address, item.phoneNo)
          }
        >
          Edit Details
        </button>
      </li>
    )
  );

  return (
    <section className="container">
      <h4>Edit Personal Details</h4>

      <div className="show-booking-details">
        <ul className="list-group">
          {displayCustomerDetails.length > 0 ? (
            displayCustomerDetails
          ) : (
            <h1 className="border rounded bg-info bg-opacity-10">
              Currently You do not have any bookings
            </h1>
          )}
        </ul>
      </div>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="details">
          <p>Email: {displayDetails.email}</p>
          <p>Mobile: {displayDetails.phoneNo}</p>
          <p>Adhaar Card: {displayDetails.adhaarCard}</p>
          <p>Address: {displayDetails.address}</p>
          <form onSubmit={handleChange}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control bg-danger-subtle"
                id="exampleInputEmail1"
                name="exampleInputEmail1"
                value={selectedUserMail}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputAdhaar" className="form-label">
                Adhaar card
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAdhaar"
                name="exampleInputAdhaar"
                // onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputMobile" className="form-label">
                Mobile number
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputMobile"
                name="exampleInputMobile"
                // onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                name="exampleInputAddress"
                // onChange={handleChange}
              />
            </div>

            <input
              type="submit"
              className="btn btn-primary"
              value="Submit"
              name="submit"
            />
          </form>
        </div>
        <button
          className="btn btn-warning btn-X"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </Modal>
    </section>
  );
};

export default Edit;
