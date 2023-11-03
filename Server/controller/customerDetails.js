const CustomerDetails=require('../model/customerDetails')


exports.details=(req,res)=>{
    CustomerDetails.find()
    .then(
        result=>
        res.status(200).json({
            message:"CustomerDetails fetched successfully",
            data:result
        })
    )
    .catch(error=>
        res.status(500).json({
            message:"error occurred in DB",
            error:error
        }))
}

exports.detailsFilter=(req,res)=>{
  const {roomType,roomNos,startTime,endTime} = req.body
  const filter = {}
  if(roomType){
    filter.rooms = {$regex: `^${roomType.charAt(0)}`, $options: "i"}
  }
  if(roomNos){
    filter.rooms = {$in: roomNos.split(",")}
  }
  if(startTime){
    filter.startTime = {$gte: new Date(startTime)}
  }
  if(endTime){
    filter.endTime = {$lte: new Date(endTime)}
  }

  CustomerDetails.find(filter)
  .then(
      result=>
      res.status(200).json({
          message:"CustomerDetails fetched successfully",
          data:result
      })
  )
  .catch(error=>
      res.status(500).json({
          message:"error occurred in DB",
          error:error
      }))
}

exports.detailsEmail=(req,res)=>{
  const {email} = req.body;
  CustomerDetails.find({email:email})
  .then(
      result=>
      res.status(200).json({
          message:"CustomerDetails fetched successfully",
          data:result
      })
  )
  .catch(error=>
      res.status(500).json({
          message:"error occurred in DB",
          error:error
      }))
}
exports.saveDetails=(req,res)=>{
    const userData = new CustomerDetails({
        name: req.body.name,
        totalGuests: req.body.totalGuests,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        adhaarCard: req.body.adhaarCard,
        address: req.body.address,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        totalAmount: req.body.totalAmount,
        rooms: req.body.rooms,
    })

    userData.save((err, data)=>{
        if(err){
            console.log("error occurred while saving user details");
            res.status(500).json({
                error: err
            })
        } else{
            res.status(200).json({
                message:"data saved",
                data: data
            })
        }
    })

}

exports.updateDetails = async (req, res) => {
  try {
    const { email, address, phoneNo, adhaarCard } = req.body;
    const updatedDetails = await CustomerDetails.findOneAndUpdate(
      {"email": email},
      {
        $set: {
          email: email,
          address: address,
          phoneNo: phoneNo,
          adhaarCard: adhaarCard
        }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Details updated successfully",
      data: updatedDetails
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred in DB",
      error: error
    });
  }
};

exports.removedetails = async (req, res) => {
  try {
    const email = req.body.email;
    const deletedDetails = await CustomerDetails.findOneAndDelete({ email: email });
    if (!deletedDetails) {
      return res.status(500).json({ message: "No details found for this email" });
    }
    res.status(200).json({ message: "Details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error occurred in DB", error: error });
  }
};

