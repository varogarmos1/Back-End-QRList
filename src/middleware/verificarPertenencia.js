import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserOrganizacion } from '../models/userOrganizacionModel.js';
import { getOrganizacionByCodigo } from '../models/organizacionModel.js';

dotenv.config();

export async function verificarPertenencia(req, res, next) {
        console.log('Verificando pertenencia');
        if (!req.usuario) {
            return res.status(401).json({ error: 'Acceso denegado. Usuario no autenticado' });
        }
        console.log('Usuario autenticado');
        try{
            const id = req.usuario.id;
            const {codigo} = req.params;

            const org = await getOrganizacionByCodigo(codigo);

            const user = await getUserOrganizacion(id, org.id);

            if (!user) {
                req.pertenece = false;
            }
            else {
                req.pertenece = true;
            }
            console.log('Pertenencia verificada', req.pertenece);
            next();
        }
        catch (error) {
            res.status(500).json({ error: 'Error al verificar rol' });
        }

}