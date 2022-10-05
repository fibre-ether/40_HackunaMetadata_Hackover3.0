import express from 'express';
import {verifyToken} from '../middlewhere/auth.js';
import {
    getEventByCategory,
    createEvent,
    getAllCategories,
    deleteEvent,
    searchEvent,
    getAllEvents,
    updateEvent,
} from'../controllers/events.js';
const router = new express.Router();

router.get('/category' , getEventByCategory);
router.post('/create' , createEvent);
router.delete('/delete' , deleteEvent);
router.get('/search' , searchEvent);
router.get('/all' , getAllEvents);
router.put('/update' , updateEvent);
router.get('/allCategories' , getAllCategories);

export default router