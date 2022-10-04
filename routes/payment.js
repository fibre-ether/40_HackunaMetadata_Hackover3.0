import express from'express';
import {verifyToken} from '../middlewhere/auth.js';
import {
  makePayment,
  verify,
} from'../controllers/payment.js'

const router = new express.Router()


router.post('/verify', verify)
router.post('/pay', makePayment)



export default router