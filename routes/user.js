import express from'express';
import {verifyToken} from '../middlewhere/auth.js';
import {
  login,
  registerNewUser,
  getUnverifiedOrganizers,
  joinEvent,
  fileUpload
} from'../controllers/user.js'
import Multer from 'multer';

const router = new express.Router()

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

//Login , Signup
router.post('/login', login)
router.post('/signup', registerNewUser)
router.post('/joinEvent', joinEvent)
router.post('/verifyImg', multer.single("file") , fileUpload)

// Admin
router.get('/getUnverifiedOrgz' ,  getUnverifiedOrganizers)


export default router