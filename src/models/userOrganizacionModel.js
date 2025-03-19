import { pool } from '../config/db.js';

export async function addUserToOrganizacion(id_usuario, id_organizacion, permisos, codigo_vendedor) {
    try {
        const [result] = await pool.query(`
            INSERT INTO user_organizacion (id_usuario, id_organizacion, permisos, codigo_vendedor)
            VALUES (?, ?, ?, ?)
        `, [id_usuario, id_organizacion, permisos, codigo_vendedor]);
        return result.insertId;
    } catch (error) {
        console.error("Error al añadir usuario a la organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function getUserOrganizacion(id_usuario, id_organizacion) {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM user_organizacion WHERE id_usuario = ? AND id_organizacion = ?
        `, [id_usuario, id_organizacion]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener usuario de la organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function getUserOrganizacionByCodigoVendedor(codigo_vendedor,  id_organizacion) {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM user_organizacion WHERE codigo_vendedor = ? AND id_organizacion = ?
        `, [codigo_vendedor, id_organizacion]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener usuario de la organización por código de vendedor:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function updateUserPermisosInOrganizacion(id_usuario, id_organizacion, permisos) {
    try {
        const [result] = await pool.query(`
            UPDATE user_organizacion SET permisos = ? WHERE id_usuario = ? AND id_organizacion = ?
        `, [permisos, id_usuario, id_organizacion]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error al actualizar permisos del usuario en la organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function removeUserFromOrganizacion(id) {
    try {
        const [result] = await pool.query(`
            DELETE FROM user_organizacion WHERE id = ?
        `, [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error al eliminar usuario de la organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function getAllUserIdsFromOrganizacion(id_organizacion) {
    try {
        const [rows] = await pool.query(`
            SELECT id_usuario FROM user_organizacion WHERE id_organizacion = ?
        `, [id_organizacion]);
        return rows.map(row => row.id_usuario);
    } catch (error) {
        console.error("Error al obtener todos los IDs de usuarios de la organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}
