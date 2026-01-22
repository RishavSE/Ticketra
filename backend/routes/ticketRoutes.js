import express from 'express';
import {
  createTicket,
  getUserTickets,
  getTicketById,
  getAllTickets,
  updateTicketStatusOrComment,
} from '../controllers/ticketController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTicket);

router.get('/agent', authMiddleware, getAllTickets);

router.get('/', authMiddleware, getUserTickets);

router.get('/:id', authMiddleware, getTicketById);

router.put('/update/:id', authMiddleware, updateTicketStatusOrComment);

export default router;
