import express from'express';
import {verifyToken} from '../middlewhere/auth.js';
import {
  login,
  registerNewUser
} from'../controllers/user.js'

const router = new express.Router()

//Login User
router.post('/login', login)
router.post('/signup', registerNewUser)


export default router