import { pool } from '../config/db.js';

export async function createOrganizacion(nombre, descripcion, codigo_org, id_super_admin ) {
    try {
        const [result] = await pool.query(`
            INSERT INTO organizaciones (nombre, descripcion, codigo, id_super_admin)
            VALUES (?, ?, ?, ?)
        `, [nombre, descripcion,codigo_org, id_super_admin]);
        return result.insertId;
    } catch (error) {
        console.error("Error al crear organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function getOrganizacionByCodigo(codigo_org) {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM organizaciones WHERE codigo = ?
        `, [codigo_org]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}
export async function getOrganizacionIdByName(name) {
    try {
        const [rows] = await pool.query(`
            SELECT id FROM organizaciones WHERE nombre = ?
        `, [name]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function updateOrganizacion(codigo_org, nombre, descripcion) {
    try {
        const [result] = await pool.query(`
            UPDATE organizaciones SET nombre = ?, descripcion = ? WHERE codigo = ?
        `, [nombre, descripcion, codigo_org]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error al actualizar organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function deleteOrganizacion(codigo_org) {
    try {
        const [result] = await pool.query(`
            DELETE FROM organizaciones WHERE codigo = ?
        `, [codigo_org]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error al eliminar organización:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}
