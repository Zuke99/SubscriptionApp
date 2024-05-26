const RazorPay = require('razorpay');
const crypto = require('crypto');
const generateHmacSha256 = require('../utils/generateHmac');

const userSchema = require('../models/User');

require('dotenv').config();

const getKey = () => {
   return process.env.RAZORPAY_KEY_ID;
}

const createPayment = async(data) => {
    const price = data.price;

    const instance = new RazorPay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: price * 100,
        currency: "INR",
        receipt: "order_rcptid_11",
    };

    let order;
    try {
        order = await instance.orders.create(options);
    } catch (error) {
        console.error("An Error has occured", error);
    }
    console.log("Payment Service", order);

    return order;
}

const verifyPayment = async(data) => {
    console.log("VerifyPayment", data)
    const generated_signature = generateHmacSha256.generateHmacSha256(
        data.razorpayOrderId + "|" + data.razorpayPaymentId,
        process.env.RAZORPAY_KEY_SECRET
    )
    const isPaymentAuthnticated = generated_signature === data.razorpaySignature;
    //console.log(generated_signature + "..."+)
    let result;
    if(isPaymentAuthnticated) {

        result = await userSchema.findByIdAndUpdate(
            data.userId,
            { $push: { unlocked: data.postId} },
            { new: true, useFindAndModify: false },
        )
        
    }

    return result;

}


module.exports = {
    getKey,
    createPayment,
    verifyPayment
}