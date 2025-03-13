import { pool } from '../config/db.js';

export async function getEventosFromOrganization(id) {
    try {
        const [rows] = await pool.query(`
            SELECT nombre_evento 
            FROM eventos
            WHERE id_organizacion = ?
        `, [id]);
        return rows;
    } catch (error) {
        console.error("Error al obtener los eventos de la organizacion:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function getEventoIdByName(nombre) {
    try {
        const [rows] = await pool.query(
            "SELECT id FROM eventos WHERE nombre_evento = ? LIMIT 1", 
            [nombre]
        );

        // Verifica si el evento existe
        if (rows.length > 0) {
            return rows[0].id; // Retorna el ID del evento encontrado
        } else {
            return null; // Si no encuentra el evento, retorna null
        }
    } catch (error) {
        console.error("Error al obtener el ID del evento:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function getEventoFromOrganization(id_organizacion, nombre_evento) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM eventos
        WHERE nombre_evento = ? AND id_organizacion = ?
    `, [nombre_evento, id_organizacion]);
    return rows[0];
}

export async function createEventos(nombre_evento, descripcion, fecha, ubicacion, aforo_maximo, precio_entrada, id_organizacion, id_creador, estado) {
    const [result] = await pool.query(`
        INSERT INTO eventos (nombre_evento, descripcion, fecha, ubicacion, aforo_maximo, precio_entrada, id_organizacion, id_creador, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [nombre_evento, descripcion, fecha, ubicacion, aforo_maximo, precio_entrada, id_organizacion, id_creador, estado]);
    return result.insertId;
}

export async function deleteEvento(id) {
    try {
        const [result] = await pool.query(`
            DELETE FROM eventos WHERE id = ?;
        `, [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleteEvento:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function cambioAtributo(atributo, valor, id_evento) {
    try {
        const query = `
            UPDATE eventos SET ${atributo} = ? WHERE id = ?;
        `;  
        const [result] = await pool.query(query, [valor, id_evento]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error en cambioAtributo:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}