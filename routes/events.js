import express from 'express';
import {verifyToken} from '../middlewhere/auth.js';
import {
    getEventByCategory,
    getAllCategories
} from'../controllers/events.js';
const router = new express.Router();

router.get('/category' , getEventByCategory);
router.get('/allCategories' , getAllCategories);

export default router