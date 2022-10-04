import express from'express';
import {verifyToken} from '../middlewhere/auth.js';
import {
  login,
  registerNewUser,
  getUnverifiedOrganizers,
  joinEvent
} from'../controllers/user.js'

const router = new express.Router()

//Login , Signup
router.post('/login', login)
router.post('/signup', registerNewUser)
router.post('/joinEvent', joinEvent)

// Admin
router.get('/getUnverifiedOrgz' ,  getUnverifiedOrganizers)


export default router