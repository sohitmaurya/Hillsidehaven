const express=require('express')
const customerDetails=require('../controller/customerDetails')



const router=express.Router();


router.get('',customerDetails.details)
router.post('/detailsEmail',customerDetails.detailsEmail)
router.put('/saveCustomerDetails',customerDetails.saveDetails)
router.post('/updateDetails',customerDetails.updateDetails)
router.post('/removedetails',customerDetails.removedetails)
router.post('/detailsFilter',customerDetails.detailsFilter)


module.exports=router;