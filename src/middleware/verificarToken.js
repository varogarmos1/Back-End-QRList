import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function verificarToken(req, res, next) {
    const token = req.header('Authorization'); // Leer el token del header

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar token
        req.usuario = decoded; // Guardamos la info del usuario en `req.usuario`
        next(); // Continuamos con la petición
    } catch (error) {
        res.status(403).json({ error: 'Token inválido o expirado' });
    }
}
