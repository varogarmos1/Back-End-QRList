import {getUserNamebyId, cambioAtributo, cambioRol, getUserByEmail} from '../models/userModel';
import {getEventosFromUser} from '../models/eventModel';
import {getUser} from '../models/userModel';
import { validationResult } from 'express-validator';

export const getUserWithParties = async (req, res) => {
    const userName = req.params.id;
    try {
        const userId = await getUserNamebyId(userName);
        if (!userId) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const parties = await getEventosFromUser(userId);
        res.json({ user, parties });
    } catch (error) {
        console.error("Error al obtener usuario y fiestas:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateUserAttribute = async (req, res) => {
    const { id } = req.params;
    const { atributo, valor } = req.body;
    const userEmail = req.user.email; // Asumiendo que el email del usuario está en req.user
    try {
        const user = await getUserByEmail(userEmail);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (user.rol !== 'administrador' && user.id !== parseInt(id)) {
            return res.status(403).json({ message: 'No tiene permiso para modificar este atributo' });
        }
        const result = await cambioAtributo(atributo, valor, id);
        if (result === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Atributo actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar atributo:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { rol } = req.body;
    try {
        const result = await cambioRol(id, rol);
        if (result === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Rol actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};