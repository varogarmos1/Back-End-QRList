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
    '/:nombre_organizacion/usuarios',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    addUser
);

userOrgRouter.get(
    '/:nombre_organizacion/usuarios/:id_usuario',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    getUser
);

userOrgRouter.get(
    '/:nombre_organizacion/usuarios',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    getAllUsers
);

userOrgRouter.put(
    '/:nombre_organizacion/usuarios/:id_usuario',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    updateUserRol
);

userOrgRouter.delete(
    '/:nombre_organizacion/usuarios/:id_usuario',
    verificarToken,
    verificarRol('admin', 'relaciones'),
    removeUser
);

export default userOrgRouter;
