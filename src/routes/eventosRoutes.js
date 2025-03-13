import express from 'express'
import { createEvent, updateEventAttribute, deleteEvent } from '../controllers/eventosController';
import { authenticateJWT } from '../middlewares/authenticateJWT';



const eventosRouter = express.Router();
eventosRouter.use(express.json());

router.post('/event', authenticateJWT, createEvent);
router.put('/event/:nombre_usuario/:nombre_evento', authenticateJWT, updateEventAttribute);
router.delete('/event/:id', authenticateJWT, deleteEvent);
