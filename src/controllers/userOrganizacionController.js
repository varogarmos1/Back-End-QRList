import {
    addUserToOrganizacion,
    getUserOrganizacion,
    updateUserPermisosInOrganizacion,
    removeUserFromOrganizacion,
    getAllUserIdsFromOrganizacion
} from '../models/userOrganizacionModel.js';
import { getUsersByIds, getUserByEmail } from '../models/usersModel.js';
import { getOrganizacionIdByName } from '../models/organizacionModel.js';
import { getUserOrganizacionByCodigoVendedor } from '../models/userOrganizacionModel.js';

//POST /:nombre_organizacion/usuarios
//Añadir un usuario a una organización
export async function addUser(req, res) {
    const { correo, nombre_organizacion, permisos, codigo_vendedor } = req.body;
    const usuario = await getUserByEmail(correo);
    const id_organizacion = await getOrganizacionIdByName(nombre_organizacion);
    try {
        const id = await addUserToOrganizacion(usuario.id, id_organizacion.id, permisos, codigo_vendedor);
        res.status(201).json({ mensaje: 'Usuario añadido a la organización', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir usuario a la organización' });
    }
}

//GET /:nombre_organizacion/usuarios/:codigo_vendedor
//Obtener un usuario de una organización
export async function getUser(req, res) {
    const { nombre_organizacion, codigo_vendedor } = req.params;
    try {
        const id_organizacion = await getOrganizacionIdByName(nombre_organizacion);
        const userOrganizacion = await getUserOrganizacionByCodigoVendedor(codigo_vendedor, id_organizacion.id);
        // const userOrganizacion = await getUserOrganizacion(id_usuario, id_organizacion);
        if (!userOrganizacion) {
            return res.status(404).json({ error: 'Usuario no encontrado en la organización' });
        }
        res.json(userOrganizacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario de la organización' });
    }
}

//PUT /:nombre_organizacion/usuarios/:codigo_vendedor
//Actualizar los permisos de un usuario en una organización
export async function updateUserPermisos(req, res) {
    const { nombre_organizacion, codigo_vendedor } = req.params;
    const { permisos } = req.body;
    try {
        const id_organizacion = await getOrganizacionIdByName(nombre_organizacion);
        const userOrganizacion = await getUserOrganizacionByCodigoVendedor(codigo_vendedor, id_organizacion.id);
        const affectedRows = await updateUserPermisosInOrganizacion(userOrganizacion.id_usuario, id_organizacion.id, permisos);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado en la organización' });
        }
        res.json({ mensaje: 'Rol del usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar permisos del usuario en la organización' });
    }
}

//DELETE /:nombre_organizacion/usuarios/:codigo_vendedor
//Eliminar un usuario de una organización
export async function removeUser(req, res) {
    const { nombre_organizacion, codigo_vendedor } = req.params;
    try {
        const id_organizacion = await getOrganizacionIdByName(nombre_organizacion);
        const userOrganizacion = await getUserOrganizacionByCodigoVendedor(codigo_vendedor, id_organizacion.id);
        console.log(userOrganizacion.id);
        const affectedRows = await removeUserFromOrganizacion(userOrganizacion.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado en la organización' });
        }
        res.json({ mensaje: 'Usuario eliminado de la organización' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario de la organización' });
    }
}

//GET /:nombre_organizacion/usuarios
//Obtener todos los usuarios de una organización
export async function getAllUsers(req, res) {
    const { nombre_organizacion } = req.params;
    try {
        const id_organizacion = await getOrganizacionIdByName(nombre_organizacion);
        const userIds = await getAllUserIdsFromOrganizacion(id_organizacion.id);
        if (userIds.length === 0) {
            return res.status(404).json({ error: 'No se encontraron usuarios en la organización' });
        }
        const users = await getUsersByIds(userIds);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios de la organización' });
    }
}
