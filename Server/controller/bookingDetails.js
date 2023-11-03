const BookingDetails = require('../model/bookingDetails')


exports.details = (req, res) => {
    BookingDetails.find()
        .then(
            result =>
                res.status(200).json({
                    message: "Bookings fetched successfully",
                    data: result
                })
        )
        .catch(error =>
            res.status(500).json({
                message: "error occurred in DB",
                error: error
            }))
}

exports.updateDetails = async (req, res) => {
    try {
        const { totalAmount } = req.body;

        const updatedDetails = await BookingDetails.findOneAndUpdate(
            {},
            {
                $inc: {
                    totalAmount: totalAmount,
                }
            },
            { new: true }
        );

        res.status(200).json({
            message: "Amount updated successfully",
            data: updatedDetails
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred in DB",
            error: error
        });
    }
};
