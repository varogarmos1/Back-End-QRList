import express from 'express'
import { createNewEvento, getEventos, getEventoByCodigoController, updateExistingEvento, deleteEventoById} from '../controllers/eventosController.js';
import { verificarPermisos } from '../middleware/verificarPermisos.js';
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarPertenencia } from '../middleware/verificarPertenencia.js';



const eventosRouter = express.Router({ mergeParams: true });


eventosRouter.get('/',
    getEventos);

    

eventosRouter.get('/:codigo_evento',
    getEventoByCodigoController);


eventosRouter.post(
    '/',
    verificarToken,
    verificarPermisos('super-admin','admin'),
    createNewEvento);

eventosRouter.put(
    '/:codigo_evento',
    verificarToken,
    verificarPermisos('super-admin','admin'),
    updateExistingEvento);


eventosRouter.delete('/:codigo_evento',
    verificarToken,
    verificarPermisos('super-admin','admin'),
    deleteEventoById
);

export default eventosRouter;
