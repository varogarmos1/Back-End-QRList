import jwt from 'jsonwebtoken';
import dotenv, { parse } from 'dotenv';
import {getUserOrganizacion } from '../models/userOrganizacionModel.js';
import {getOrganizacionByCodigo} from '../models/organizacionModel.js';

dotenv.config();

export function verificarPermisos(...permisosPermitidos) {
    return async (req, res, next) => {
        const { codigo } = req.params;
        if (!req.usuario) {
            return res.status(401).json({ error: 'Acceso denegado. Usuario no autenticado' });
        }
        const organizacion = await getOrganizacionByCodigo(codigo);
        if (!organizacion) {
            return res.status(404).json({ error: 'Organización no encontrada' });
        }
        
        const user = await getUserOrganizacion(req.usuario.id, organizacion.id); 
        if (!user) {
            return res.status(403).json({ error: 'Acceso denegado. Usuario no pertenece a la organización' });
        }
        if (!permisosPermitidos.includes(user.permisos)) {
            return res.status(403).json({ error: 'Acceso denegado. Permisos insuficientes' });
        }

        next();
    };
}
