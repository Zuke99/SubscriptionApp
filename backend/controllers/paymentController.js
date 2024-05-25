
const paymentService = require('../services/paymentService');

const getKey = async(req, res) => {
    try{
        const result = paymentService.getKey();
        
        if(result) {
            res.status(200).json({status : "success", message: "Key Retrieved Successfully", data: result});
        }
    } catch (err) {
        res.status(200).json({status: "error", data: err});
    }
}

const createPayment = async(req, res) => {
    try{
        const result = await paymentService.createPayment(req.body);
        if(result)
            res.status(200).json({status: "success", message: "Payment Created Successfully", data: result})
    } catch (err) {
        res.status(200).json({status: "error", data: err});
    }
}

const verifyPayment = async(req, res) => {
    try{
        const result = await paymentService.verifyPayment(req.body);
        if(result){
           // res.redirect('http://localhost:3000/view-posts')
            res.status(200).json({status: "success", message: "Payment Verified Successfully", data: result})
        }
    } catch (err) {
        res.status(200).json({status: "error", data: err});
    }
}

module.exports = {
    getKey,
    createPayment,
    verifyPayment
}