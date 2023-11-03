import "./Checkout.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  const [customerDetails, setcustomerDetails] = useState({});

  const [selectedUser, setSelectedUser] = useState();

  const [selectedUserDetails, setSelectedUserDetails] = useState({});

  const deleteCredentials = async () => {
    const email = selectedUserDetails?.email;
    try {
      const response = await axios.post(
        "https://inquisitive-bear-gaiters.cyclic.app/customerDetails/removedetails",
        { email }
      );
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => refreshPage(), 2000);
    alert("Checked out!")
  };

  const refreshPage = () => {
    window.location.reload(false);
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

  useEffect(() => {
    async function updateData() {
      if (selectedUser) {
        const email = selectedUser;
        try {
          const response = await axios.post(
            "https://inquisitive-bear-gaiters.cyclic.app/customerDetails/detailsEmail",
            { email }
          );
          setSelectedUserDetails(response.data.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    }
    updateData();
  }, [selectedUser]);

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };


  const dropdownMailAddress = Object.entries(customerDetails).map(
    ([key, item]) => (
      <option value={item.email} key={key}>
        {item.email}
      </option>
    )
  );

  return (
    <section className="container checkout-container">
      <h3>Checkout</h3>

      <select
        className="form-select form-select-sm form-select-container"
        aria-label=".form-select-sm example"
        onChange={handleSelectChange}
      >
        <option>Select mail of customer</option>
        {dropdownMailAddress}
      </select>

      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Name: {selectedUserDetails?.name}</li>
          <li className="list-group-item">
            Total guests: {selectedUserDetails?.totalGuests}
          </li>
          <li className="list-group-item">
            Mobile no: {selectedUserDetails?.phoneNo}
          </li>
          <li className="list-group-item">
            Email: {selectedUserDetails?.email}
          </li>
          <li className="list-group-item">
            Checkin date: {Object.entries(selectedUserDetails).length > 0 ? selectedUserDetails?.startTime.split("T")[0] : ""}
          </li>
          <li className="list-group-item">
            Address: {selectedUserDetails?.address}
          </li>
          <li className="list-group-item">
            Total Amount Paid: ₹ {selectedUserDetails?.totalAmount}
          </li>
        </ul>
      </div>

      <div className="button-checkout-container">
        <button
          className="btn btn-primary btn-checkout"
          onClick={() => deleteCredentials()}
        >
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Checkout;
