import express from'express';
import {verifyToken} from '../middlewhere/auth.js';
import {
  login,
  registerNewUser,
  getUnverifiedOrganizers
} from'../controllers/user.js'

const router = new express.Router()

//Login , Signup
router.post('/login', login)
router.post('/signup', registerNewUser)

// Admin
router.get('/getUnverifiedOrgz', verifyToken ,  getUnverifiedOrganizers)


export default router