import "./Book.css";
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import SEND_EMAIL from "../SendEmail";

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
const Book = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [minDate, setMinDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [customerDetails, setcustomerDetails] = useState({
    name: "",
    totalGuests: "",
    phoneNo: "",
    email: "",
    adhaarCard: "",
    address: "",
    from: "",
    till: "",
    startTime: "",
    endTime: "",
    rooms: [],
    totalAmount: "",
  });

  const roomsNos = ["A1", "A2", "B1", "B2", "B3", "C1", "C2", "C3", "C4", "C5"];

  const displayRoomInputs = [];
  for (let i = 0; i < roomsNos.length; i++) {
    displayRoomInputs.push(
      <div key={i} className="room-type">
        <input
          type="checkbox"
          name="room"
          className="form-check-input form-check-input"
          value={roomsNos[i]}
          id={roomsNos[i]}
        />
        <label for={roomsNos[i]} className="label-rooms">
          {roomsNos[i]}
        </label>
      </div>
    );
  }

  const checkOverlappingBooking = async (newBooking) => {
    const data = {
      roomType: "",
      roomNos: newBooking.rooms.map((room) => room.slice(0)).join(","),
      startTime: formatDate(newBooking.startTime),
      endTime: formatDate(newBooking.endTime),
    };

    var response;
    try {
      response = await axios.post(
        "https://inquisitive-bear-gaiters.cyclic.app/customerDetails/detailsFilter",
        data
      );
    } catch (err) {
      console.err(err);
    }
    const existingBookings = response.data.data;

    return existingBookings;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const rooms = [];
    for (let [name, value] of formData.entries()) {
      if (name.startsWith("room")) {
        rooms.push(value);
      }
    }
    const details = {
      name: formData.get("customername"),
      totalGuests: formData.get("totalGuests"),
      phoneNo: formData.get("phoneNo"),
      email: formData.get("emailaddress"),
      adhaarCard: formData.get("adhaarCard"),
      address: formData.get("address"),
      startTime: startTimeSet(formData.get("datestart")),
      endTime: endTime(formData.get("dateEnd"), formData.get("timeBooking")),
      rooms: rooms,
    };

    const dataReceivedFilterd = await checkOverlappingBooking(details);

    if (dataReceivedFilterd.length > 0) {
      alert(
        "This time slot is already booked. Please, refer previous bookings!"
      );
      return;
    }

    const diff = details.endTime - details.startTime; // Difference in milliseconds
    const hours = diff / (1000 * 60 * 60); // Convert milliseconds to hours

    const newHr = parseInt(hours);
    var sum = 0;
    for (let i = 0; i < details.rooms.length; i++) {
      if (details.rooms[i].startsWith("A")) {
        sum += 100 * newHr;
      } else if (details.rooms[i].startsWith("B")) {
        sum += 80 * newHr;
      } else if (details.rooms[i].startsWith("C")) {
        sum += 50 * newHr;
      }
    }
    details["totalAmount"] = sum;

    setcustomerDetails(details);
    setIsOpen(true);
  };

  const startTimeSet = (date) => {
    const start = new Date(`${date}T09:00:00.000Z`);
    return start;
  };

  const endTime = (date, time) => {
    const end = new Date(`${date}T${time}`);
    return end;
  };

  const sendDataToBackend = () => {
    async function sendBookingData() {
      const data = customerDetails;
      try {
        const response = await axios.put(
          "https://inquisitive-bear-gaiters.cyclic.app/customerDetails/saveCustomerDetails",
          data
        );
      } catch (error) {
        console.error(error);
      }
    }
    sendBookingData();

    async function setTotalPrice() {
      const totalAmount = parseInt(customerDetails?.totalAmount);
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
      alert("Your room has been booked...");
      SEND_EMAIL(customerDetails);
      setIsOpen2(false);
    }, 1000);
  };

  const handleSubmitPayment = () => {
    setTimeout(() => {
      sendDataToBackend();
    }, 2000);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <section className="container-fluid">
      <div className="container">
        <h3>Book your Room</h3>

        <form onSubmit={handleSubmit} className="form-details-fill">
          <div className="mb-1 input-group-sm">
            <label for="customername" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="customername"
              id="customername"
              className="form-control"
              placeholder="Enter Name..."
              required
            />
          </div>

          <div className="mb-1 input-group-sm">
            <label for="totalGuests" className="form-label">
              Total guest(s){" "}
            </label>
            <input
              type="number"
              name="totalGuests"
              id="totalGuests"
              className="form-control"
              placeholder="Enter total guests"
              required
            />
          </div>

          <div className="mb-1 input-group-sm">
            <label for="phoneno" className="form-label">
              Enter mobile no
            </label>
            <input
              type="text"
              name="phoneNo"
              id="phoneno"
              className="form-control"
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div className="mb-1 input-group-sm">
            <label for="emailaddress" className="form-label">
              Enter email
            </label>
            <input
              type="email"
              name="emailaddress"
              id="emailaddress"
              className="form-control"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mb-1 input-group-sm">
            <label for="adhaarCard" className="from-label">
              Adhaar card
            </label>
            <input
              type="text"
              name="adhaarCard"
              id="adhaarCard"
              className="form-control"
              placeholder="Enter card number"
              required
            />
          </div>

          <div className="mb-1 input-group-sm">
            <label for="address" className="form-label">
              Address
            </label>
            <textarea
              className="form-control"
              placeholder="Enter customers address"
              name="address"
              id="address"
            ></textarea>
          </div>

          <div className="input-group-sm time-container">
            <label for="datestart" className="form-label">
              From:
              <input
                type="date"
                name="datestart"
                id="datestart"
                className="form-control-sm"
                min={minDate}
                required
              />
            </label>
            <label for="dateEnd" className="form-label">
              Till:
              <input
                type="date"
                name="dateEnd"
                id="dateEnd"
                className="form-control-sm"
                min={minDate}
                required
              />
            </label>
            <label for="timeBooking" className="form-label">
              End Time:
              <input
                type="time"
                name="timeBooking"
                id="timeBooking"
                className="form-controlsm"
                required
                pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
              />
            </label>
          </div>

          <div className="mb-1">
            <label for="" className="form-label">
              Choose room(s)
            </label>
            <div className="check-rooms">{displayRoomInputs}</div>
          </div>

          <aside className="btn-check-details">
            <button type="submit" className="btn btn-primary">
              Check Details
            </button>
          </aside>
        </form>
      </div>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="card container card-display">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Name: {customerDetails.name}</li>
            <li className="list-group-item">
              Rooms Booked: {customerDetails.rooms}
            </li>
            <li className="list-group-item">
              Total guests: {customerDetails.totalGuests}
            </li>
            <li className="list-group-item">
              Mobile: {customerDetails.phoneNo}
            </li>
            <li className="list-group-item">Email: {customerDetails.email}</li>
            <li className="list-group-item">
              Total amount: ₹ {customerDetails.totalAmount}
            </li>
          </ul>
          <button
            className="btn btn-success btn-final-submit"
            onClick={() => {
              setIsOpen2(true);
              setIsOpen(false);
            }}
          >
            Pay
          </button>
        </div>
        <button
          className="btn btn-warning btn-X-booking"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </Modal>

      <Modal style={customStyles} isOpen={isOpen2}>
        <div className="payment-display-total">
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            required
          >
            <option selected>Select Payment option</option>
            <option value="Credit-card">Credit card</option>
            <option value="Debit-card">Debit card</option>
            <option value="UPI">UPI</option>
            <option value="Google-Pay">Google Pay</option>
            <option value="Amazon-Pay">Amazon Pay</option>
            <option value="PhonePe">PhonePe</option>
          </select>

          <ul className="list-group">
            <li className="list-group-item">
              Total amount: ₹ {customerDetails.totalAmount}
            </li>
          </ul>
          <button
            type="submit"
            className="btn btn-success col-auto"
            onClick={() => handleSubmitPayment()}
          >
            Pay
          </button>
          <button
            className="btn btn-warning btn-X-pay"
            onClick={() => setIsOpen2(false)}
          >
            X
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Book;
