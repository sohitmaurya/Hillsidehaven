const express=require('express')
const bookingDetails=require('../controller/bookingDetails')



const router=express.Router();


router.get('',bookingDetails.details)
router.post('/updateDetails',bookingDetails.updateDetails)


module.exports=router;