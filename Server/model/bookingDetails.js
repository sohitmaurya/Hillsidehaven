const mongoose=require('mongoose')


const bookingDetailsSchema=mongoose.Schema({
    total:{
        type:Number,
        require:true
    },
    totalAmount:{
        type:Number,
        require:true
    }
})

module.exports=mongoose.model('BookingDetails',bookingDetailsSchema,"bookingDetails")