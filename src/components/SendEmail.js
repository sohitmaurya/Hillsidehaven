import emailjs from '@emailjs/browser';

const SendEmail = (details) => {


    const sendDetails = {
        user_email: details?.email,
        to_name: details?.name,
        totalGuests: details?.totalGuests,
        checkInDate: fromatDate(details.startTime),
        checkOutDate: fromatDate(details.endTime),
        numberOfRooms: details?.rooms.length,
        totalAmount: details?.totalAmount,
    }
    function fromatDate(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }


    emailjs.send('service_l9n7bhl', 'template_e50e4vo', sendDetails, 'yp6Lay4zN6QYziZw3')
        .then((result) => {
            alert("Mail has been sent!")
            setTimeout(() => refreshPage(), 1000)
        }, (error) => {
            console.error(error.text)
        })

    const refreshPage = () => {
        window.location.reload(false);
    };

}

export default SendEmail
