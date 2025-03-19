import jwt from 'jsonwebtoken';
import dotenv, { parse } from 'dotenv';
import {getUserOrganizacion } from '../models/userOrganizacionModel.js';
import {getOrganizacionIdByName} from '../models/organizacionModel.js';

dotenv.config();

export function verificarPermisos(...permisosPermitidos) {
    return async (req, res, next) => {
        const { nombre_organizacion } = req.params;
        if (!req.usuario) {
            return res.status(401).json({ error: 'Acceso denegado. Usuario no autenticado' });
        }
        const id_organizacion = await getOrganizacionIdByName(nombre_organizacion);
        const int_id_organizacion = parseInt(id_organizacion.id);
        const user = await getUserOrganizacion(req.usuario.id, int_id_organizacion); 
        if (!user) {
            return res.status(403).json({ error: 'Acceso denegado. Usuario no pertenece a la organización' });
        }
        if (!permisosPermitidos.includes(user.permisos)) {
            return res.status(403).json({ error: 'Acceso denegado. Permisos insuficientes' });
        }

        next();
    };
}
