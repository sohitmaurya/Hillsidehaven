import "./Home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [dataBooking, setDataBooking] = useState({});

  const [customerDetails, setcustomerDetails] = useState([]);

  const [totalBookings, setToatlbookings] = useState();

  const [sendDataBackFilter, setSendDataBackFilter] = useState({
    roomType: "",
    roomNos: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://inquisitive-bear-gaiters.cyclic.app/bookingDetails",
        );
        setDataBooking(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    fetch("https://inquisitive-bear-gaiters.cyclic.app/customerDetails/detailsFilter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendDataBackFilter),
    })
      .then((response) => response.json())
      .then((data) => setcustomerDetails(data.data));
  }, [sendDataBackFilter]);


  useEffect(()=>{
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://inquisitive-bear-gaiters.cyclic.app/customerDetails",
        );
        setToatlbookings(response.data.data.length);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  },[])
  
  
  const displayCustomerDetails =
    customerDetails != null &&
    Object.entries(customerDetails).map(([key, item]) => (
      <li
        className="list-group-item list-group-item-action list-group-item-home"
        key={key}
      >
        <div>
          <span>{item?.name}</span>
          <span>Mobile No: {item?.phoneNo}</span>
          <span>Room No: {item?.rooms}</span>
          <span>Checkin Date: {item?.startTime?.split("T")[0]}</span>
          <span>Checkout Date: {item?.endTime?.split("T")[0]}</span>
          <span>Total Amount: ₹ {item?.totalAmount}</span>
        </div>
      </li>
    ));

  const handleRoomType = (e) => {
    sendDataBackFilter.roomType = e.target.value;
    setSendDataBackFilter({ ...sendDataBackFilter });
  };

  const handleRoomNo = (e) => {
    sendDataBackFilter.roomNos = e.target.value;
    setSendDataBackFilter({ ...sendDataBackFilter });
  };

  const handleStartTime = (e) => {
    sendDataBackFilter.startTime = e.target.value;
    setSendDataBackFilter({ ...sendDataBackFilter });
  };
  const handleEndTime = (e) => {
    sendDataBackFilter.endTime = e.target.value;
    setSendDataBackFilter({ ...sendDataBackFilter });
  };
  const roomNos = ["A1", "A2", "B1", "B2", "B3", "C1", "C2", "C3", "C4", "C5"];

  const optionsRoomsDisplay = [];
  for (let i = 0; i < roomNos.length; i++) {
    if (sendDataBackFilter.roomType == "") {
      optionsRoomsDisplay.push(
        <option value={roomNos[i]} key={roomNos[i]}>
          {roomNos[i]}
        </option>
      );
    } else if (roomNos[i].startsWith(sendDataBackFilter.roomType)) {
      optionsRoomsDisplay.push(
        <option value={roomNos[i]} key={roomNos[i]}>
          {roomNos[i]}
        </option>
      );
    }
  }

  const refreshPage = () => {
    window.location.reload(false);
  };

  

  return (
    <section className="container">
      <h2>Dashboard</h2>

      <div className="details-container">
        <div className="details-booking total-rooms">
          <h4>{dataBooking?.total}</h4>
          <p>Total Rooms</p>
        </div>


        <div className="details-booking booked-rooms">
          <h4>{totalBookings}</h4>
          <p>Rooms Booked</p>
        </div>

        <div className="details-booking total-amount">
          <h4>₹ {dataBooking?.totalAmount}</h4>
          <p>Total earning</p>
        </div>
      </div>

      <div className="show-booking-details">
        <h4>Filter(s)</h4>
        <div className="filter-select">
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            onChange={handleRoomType}
          >
            <option selected value="">
              Select room type
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            onChange={handleRoomNo}
          >
            <option selected>Select room no</option>
            {optionsRoomsDisplay}
          </select>

          <div className="mb-3 input-group-sm">
            <label for="start-time" className="form-label">
              Start Date:
            </label>
            <input
              type="date"
              name="start-time"
              id="start-time"
              className="form-control-sm"
              onChange={handleStartTime}
            />
          </div>

          <div className="mb-3 input-group-sm">
            <label for="end-time" className="form-label">
              End Date:
            </label>
            <input
              type="date"
              name="end-time"
              id="end-time"
              className="form-control-sm"
              onChange={handleEndTime}
            />
          </div>
          <button
            className="btn btn-primary btn-reset-filters"
            onClick={() => refreshPage()}
          >
            Reset filters
          </button>
        </div>

        <h4>Booking Details</h4>
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
    </section>
  );
};

export default Home;
