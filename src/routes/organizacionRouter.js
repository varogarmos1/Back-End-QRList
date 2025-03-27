import express from 'express';
import {
    createOrganizacionController,
    getOrganizacionByCodigoController,
    updateOrganizacionController,
    deleteOrganizacionController
} from '../controllers/organizacionController.js';
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarRolDev } from '../middleware/verificarRolDev.js';
import { verificarPertenencia } from '../middleware/verificarPertenencia.js';
import { verificarPermisos } from '../middleware/verificarPermisos.js';
import userOrgRouter from './userOrganizacionRoutes.js';
import eventosRouter from './eventosRoutes.js';

const orgRouter = express.Router();


orgRouter.use('/:codigo_org/events', eventosRouter);
orgRouter.use('/:codigo_org/usuarios', userOrgRouter);


orgRouter.post(
    '/',
    verificarToken,
    verificarRolDev,
    createOrganizacionController);


orgRouter.get(
    '/:codigo_org',
    verificarToken,
    verificarPertenencia,
    getOrganizacionByCodigoController);


orgRouter.put(
    '/:codigo_org',
    verificarToken,
    verificarPermisos('super-admin', 'admin'),
    updateOrganizacionController);


orgRouter.delete(
    '/:codigo_org',
    verificarToken,
    verificarRolDev,
    deleteOrganizacionController);


export default orgRouter;
