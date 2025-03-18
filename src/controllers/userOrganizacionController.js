import {
    addUserToOrganizacion,
    getUserOrganizacion,
    updateUserRolInOrganizacion,
    removeUserFromOrganizacion,
    getAllUserIdsFromOrganizacion
} from '../models/userOrganizacionModel.js';
import { getUsersByIds } from '../models/usersModel.js';

export async function addUser(req, res) {
    const { id_usuario, id_organizacion, rol } = req.body;
    try {
        const id = await addUserToOrganizacion(id_usuario, id_organizacion, rol);
        res.status(201).json({ mensaje: 'Usuario añadido a la organización', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir usuario a la organización' });
    }
}

export async function getUser(req, res) {
    const { id_usuario, id_organizacion } = req.params;
    try {
        const userOrganizacion = await getUserOrganizacion(id_usuario, id_organizacion);
        if (!userOrganizacion) {
            return res.status(404).json({ error: 'Usuario no encontrado en la organización' });
        }
        res.json(userOrganizacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario de la organización' });
    }
}

export async function updateUserRol(req, res) {
    const { id_usuario, id_organizacion } = req.params;
    const { rol } = req.body;
    try {
        const affectedRows = await updateUserRolInOrganizacion(id_usuario, id_organizacion, rol);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado en la organización' });
        }
        res.json({ mensaje: 'Rol del usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar rol del usuario en la organización' });
    }
}

export async function removeUser(req, res) {
    const { id_usuario, id_organizacion } = req.params;
    try {
        const affectedRows = await removeUserFromOrganizacion(id_usuario, id_organizacion);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado en la organización' });
        }
        res.json({ mensaje: 'Usuario eliminado de la organización' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario de la organización' });
    }
}

export async function getAllUsers(req, res) {
    const { id_organizacion } = req.params;
    try {
        const userIds = await getAllUserIdsFromOrganizacion(id_organizacion);
        if (userIds.length === 0) {
            return res.status(404).json({ error: 'No se encontraron usuarios en la organización' });
        }
        const users = await getUsersByIds(userIds);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios de la organización' });
    }
}
