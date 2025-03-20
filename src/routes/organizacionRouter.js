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
import userOrgRouter from './userOrganizacionRoutes.js';
import { verificarPermisos } from '../middleware/verificarPermisos.js';

const orgRouter = express.Router();
orgRouter.post(
    '/',
    verificarToken,
    verificarRolDev,
    createOrganizacionController);


orgRouter.get(
    '/:codigo',
    verificarToken,
    verificarPertenencia,
    getOrganizacionByCodigoController);


orgRouter.put(
    '/:codigo',
    verificarToken,
    verificarPermisos('super-admin', 'admin'),
    updateOrganizacionController);


orgRouter.delete(
    '/:codigo',
    verificarToken,
    verificarRolDev,
    deleteOrganizacionController);

//orgRouter.use('/:nombre_organizacion/usuarios', userOrgRouter);

export default orgRouter;
