import express from 'express';
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarRol } from '../middleware/verificarRol.js';
import {
    addUser,
    getUser,
    updateUserRol,
    removeUser,
    getAllUsers
} from '../controllers/userOrganizacionController.js';

const userOrgRouter = express.Router();

userOrgRouter.post(
    '/',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    addUser
);

userOrgRouter.get(
    '/:id_usuario/:id_organizacion',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    getUser
);

userOrgRouter.get(
    '/organizacion/:id_organizacion/usuarios',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    getAllUsers
);

userOrgRouter.put(
    '/:id_usuario/:id_organizacion',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    updateUserRol
);

userOrgRouter.delete(
    '/:id_usuario/:id_organizacion',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    removeUser
);

export default userOrgRouter;
