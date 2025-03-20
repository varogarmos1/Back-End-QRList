import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUser } from '../models/usersModel.js';

dotenv.config();

export async function verificarRolDev(req, res, next) {
    
        if (!req.usuario) {
            return res.status(401).json({ error: 'Acceso denegado. Usuario no autenticado' });
        }
        try{
            const user = await getUser(req.usuario.id);
            if (!user) {
                return res.status(403).json({ error: 'Acceso denegado. Usuario no encontrado' });
            }
    
            if (user.rol !== 'dev' || user.rol == null) {
                return res.status(403).json({ error: 'Acceso denegado. Rol insuficiente' });
            }
            next();
        }
        catch (error) {
            res.status(500).json({ error: 'Error al verificar rol' });
        }

}
