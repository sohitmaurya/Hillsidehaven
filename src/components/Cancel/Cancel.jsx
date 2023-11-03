import "./Cancel.css";
import React, { useEffect, useState } from "react";
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
  },
};

const Cancel = () => {
  const [customerDetails, setcustomerDetails] = useState({});

  const [roomNos, setRoomNos] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [modalIsOpen2, setIsOpen2] = useState(false);

  const [penaltyCustomer, setPenaltyCustomer] = useState({});

  const [penaltyAmount, setPenaltyAmount] = useState();

  const [refundAmountVal, setRefundAmount] = useState();

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

  const handleOpen = async (item) => {
    setPenaltyCustomer(item);
    setRoomNos(item.rooms);
    const amount = await calculatePenalty(item);
    
    setTimeout(() => {
      setPenaltyAmount(amount);
    }, 1000);
    
    setTimeout(() => {
      setIsOpen(true);
    }, 800);
  };

  const deleteCredentials = async () => {
    const email = penaltyCustomer?.email;
    try {
      const response = await axios.post(
        "https://inquisitive-bear-gaiters.cyclic.app/customerDetails/removedetails",
        { email }
      );
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setIsOpen(false);
      setIsOpen2(true);
    }, 800);
  };

  const refreshPage = () => {
    setTimeout(function () {
      window.location.reload(false);; // Reloads the current page
    }, 800);
  };

  const calculatePenalty = async (item) => {
    const date1 = new Date(item.startTime);
    const date2 = new Date(currentTimeSet());
    const diff = date1 - date2; // Difference in milliseconds

    const hours = diff / (1000 * 60 * 60);
    var sum = 0;

    if (hours >= 24 && hours <= 48) {
      sum = item.totalAmount / 2;
    } else if (hours < 24) {
      sum = item.totalAmount;
    }
    return sum;
  };
  const handlePenaltyDeletion = () => {
    deleteCredentials();
  };

  const currentTimeSet = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    return formattedDate;
  };

  const refundAmount = () => {
    async function setTotalPrice() {
      const totalAmount = -refundAmountVal;
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

    setTimeout(() => {
      setIsOpen2(false);
      alert("Your booking has been cancelled")
      refreshPage();
    }, 1000);
  };

  const displayCustomerDetails = Object.entries(customerDetails).map(
    ([key, item]) => (
      <li
        className="list-group-item list-group-item-action list-group-item-cancel"
        key={key}
      >
        <div>
          <span>{item.name}</span>
          <span>Room No: {item.rooms}</span>
          <span>Total Amount: ₹ {item.totalAmount}</span>
        </div>
        <button
          className="btn btn-danger btn-cancel"
          onClick={() => handleOpen(item)}
        >
          Cancel Booking
        </button>
      </li>
    )
  );

  const handleChangeAmount = (e)=>{
    setRefundAmount(e.target.value)
  }
  return (
    <section className="container">
      <div className="show-booking-details">
        <h4>Cancel Booking</h4>

        <div className="card card-penalty-display">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Name: {penaltyCustomer.name}</li>
            <li className="list-group-item">
              Mobile No: {penaltyCustomer.phoneNo}
            </li>
            <li className="list-group-item">Room No: {roomNos}</li>
            <li className="list-group-item">Penalty: ₹ {penaltyAmount}</li>
          </ul>
        </div>
        <ul className="list-group">
          {displayCustomerDetails.length > 0 ? (
            displayCustomerDetails
          ) : (
            <h1 className="border rounded bg-info bg-opacity-10">
              Currently You do not have any bookings
            </h1>
          )}
        </ul>

        <Modal isOpen={modalIsOpen} style={customStyles}>
          <h3>Would you really like to cancel your booking?</h3>
          <h2>Penalty amount: ₹ {penaltyAmount}</h2>
          <div className="buttons-cancel-yes">
            <button
              className="btn btn-warning"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handlePenaltyDeletion()}
            >
              Yes Sure!
            </button>
          </div>
        </Modal>

        <Modal isOpen={modalIsOpen2} style={customStyles}>
          <aside className="payment-penalty">
            <ul className="list-group">
              <li className="list-group-item">Penalty amount: ₹ {penaltyAmount}</li>
              <li className="list-group-item">Refund amount: ₹ {penaltyCustomer?.totalAmount - penaltyAmount}</li>
            </ul>

            <div className="mb-3">
              <label for="refundAmount" className="form-label-sm">
                Refund
              <input
                type="number"
                className="form-control"
                id="refundAmount"
                placeholder="Enter refund amount..."
                onChange={handleChangeAmount}
                />
                </label>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setIsOpen2(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => refundAmount()}>
              Refund
            </button>
            <button
              className="btn btn-warning btn-X-cancel-payment"
              onClick={() => setIsOpen2(false)}
            >
              X
            </button>
          </aside>
        </Modal>
      </div>
    </section>
  );
};

export default Cancel;
