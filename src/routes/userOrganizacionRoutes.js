import express from 'express';
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarPermisos } from '../middleware/verificarPermisos.js';
import {
    addUser,
    getUser,
    updateUserPermisos,	
    removeUser,
    getAllUsers
} from '../controllers/userOrganizacionController.js';

const userOrgRouter = express.Router();

userOrgRouter.post(
    '/:nombre_organizacion/usuarios',
    verificarToken,
    verificarPermisos('super-admin','admin','relaciones'),
    addUser
);

userOrgRouter.get(
    '/:nombre_organizacion/usuarios/:codigo_vendedor',
    verificarToken,
    verificarPermisos('super-admin','admin','relaciones'),
    getUser
);

userOrgRouter.get(
    '/:nombre_organizacion/usuarios',
    verificarToken,
    verificarPermisos('super-admin','admin','relaciones'),
    getAllUsers
);

userOrgRouter.put(
    '/:nombre_organizacion/usuarios/:codigo_vendedor',
    verificarToken,
    verificarPermisos('super-admin','admin','relaciones'),
    updateUserPermisos
);

userOrgRouter.delete(
    '/:nombre_organizacion/usuarios/:codigo_vendedor',
    verificarToken,
    verificarPermisos('super-admin','admin','relaciones'),
    removeUser
);

export default userOrgRouter;
