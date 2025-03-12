import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function verificarRol(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ error: 'Acceso denegado. Usuario no autenticado' });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ error: 'Acceso denegado. Permisos insuficientes' });
        }

        next();
    };
}
