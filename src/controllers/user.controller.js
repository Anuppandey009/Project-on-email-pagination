const express = require('express');
const sendmail= require('../utils/sendmail');
const router = express.Router();
const User= require('../models/user.model');


router.get("",async function (req, res){
    const page= +req.query.page || 1;
    const size = +req.query.size || 10;
    const offset = (page-1)*size;
    const user = await User.find().lean().skip(offset).limit(size).exec();
    const totalUserCount = await User.find().countDocuments(); 
    const totalpages= Math.ceil(totalUserCount/size);
    
    sendmail({
        from: "anup@masai.com",
        to: "pandey@school.com",
        subject: "Welcome to ABC system",
        text: "Plaintext version of the message",
        html: "<p>Welcome to the backend</p>"
    });

    console.log(totalpages);
   return res.status(200).send({user,totalpages});
});


module.exports = router;
