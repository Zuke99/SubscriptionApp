const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');

router.get("/payment/get-key", paymentController.getKey);
router.post("/payment/create-payment", paymentController.createPayment);
router.post("/payment/payment-verification", paymentController.verifyPayment);

module.exports = router;