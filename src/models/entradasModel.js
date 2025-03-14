import { pool } from '../config/db.js';

// Función para obtener todos los tipos de entradas
export async function getAllTiposEntradas() {
    try {
        const [rows] = await pool.query('SELECT * FROM TiposEntradas');
        return rows;
    } catch (error) {
        console.error('Error al obtener los tipos de entradas:', error);
        throw error;
    }
}

// Función para obtener un tipo de entrada por su ID
export async function getTipoEntradaById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM TiposEntradas WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener el tipo de entrada:', error);
        throw error;
    }
}

// Función para crear un nuevo tipo de entrada
export async function createTipoEntrada(tipo_entrada, descripcion) {
    try {
        const [result] = await pool.query('INSERT INTO TiposEntradas (tipo_entrada, descripcion) VALUES (?, ?)', [tipo_entrada, descripcion]);
        return result.insertId;
    } catch (error) {
        console.error('Error al crear el tipo de entrada:', error);
        throw error;
    }
}

// Función para obtener todas las entradas de un evento
export async function getEntradasByEventoId(id_evento) {
    try {
        const [rows] = await pool.query('SELECT * FROM Entradas_Eventos WHERE id_evento = ?', [id_evento]);
        return rows;
    } catch (error) {
        console.error('Error al obtener las entradas del evento:', error);
        throw error;
    }
}

// Función para crear una nueva entrada para un evento
export async function createEntradaEvento(id_evento, id_tipo_entrada, cantidad, precio) {
    try {
        const [result] = await pool.query('INSERT INTO Entradas_Eventos (id_evento, id_tipo_entrada, cantidad, precio) VALUES (?, ?, ?, ?)', [id_evento, id_tipo_entrada, cantidad, precio]);
        return result.insertId;
    } catch (error) {
        console.error('Error al crear la entrada del evento:', error);
        throw error;
    }
}

// Función para actualizar la cantidad y el precio de una entrada de un evento
export async function updateEntradaEvento(id, cantidad, precio) {
    try {
        const [result] = await pool.query('UPDATE Entradas_Eventos SET cantidad = ?, precio = ? WHERE id = ?', [cantidad, precio, id]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error al actualizar la entrada del evento:', error);
        throw error;
    }
}

// Función para eliminar una entrada de un evento
export async function deleteEntradaEvento(id) {
    try {
        const [result] = await pool.query('DELETE FROM Entradas_Eventos WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error al eliminar la entrada del evento:', error);
        throw error;
    }
}