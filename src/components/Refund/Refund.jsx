import "./Refund.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Refund = () => {
  const [customerDetails, setcustomerDetails] = useState({});

  const [amountSendBack, setamountSendBack] = useState();


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

  const dropdownMailAddress = Object.entries(customerDetails).map(
    ([key, item]) => (
      <option value={item.email} key={key}>
        {item.email}
      </option>
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputAmount = (e) => {
    const amountvalue = e.target.value;
    setamountSendBack(amountvalue);
  };

  const sendAmountBack = (val) => {
    async function setTotalPrice() {
      const totalAmount = val * amountSendBack;
      try {
        const response = await axios.post(
          "https://inquisitive-bear-gaiters.cyclic.app/bookingDetails/updateDetails",
          { totalAmount }
        );
      } catch (error) {
        console.error(error);
      }
    }
    setTotalPrice();

    refreshPage();
  };

  const refreshPage = () => {
    setTimeout(function () {
      window.location.reload(false); // Reloads the current page
    }, 1000);
  };

  return (
    <section className="container refund-container">
      <h3>₹ Refund or Additional charge payment</h3>

      <form onSubmit={handleSubmit} className="form-refund-pay">
        <select className="form-select select-mail-dropdown-refund" aria-label="Default select example" required>
          <option selected>Select customers mail id</option>
          {dropdownMailAddress}
        </select>
        <div className="mb-3">
          <label htmlFor="Amount" className="form-label">
            Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="Amount"
              min={0}
              onChange={handleInputAmount}
            />
        </div>
          <div className="aside-buttons-pay">
            <button
              className="btn btn-success"
              type="submit"
              onClick={() => sendAmountBack(1)}
            >
              Pay
            </button>
            <button
              className="btn btn-danger"
              type="submit"
              onClick={() => sendAmountBack(-1)}
            >
              Refund
            </button>
          </div>
      </form>
    </section>
  );
};

export default Refund;
