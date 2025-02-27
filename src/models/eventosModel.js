import {pool} from '../config/db.js';


export async function getEventosFromUser(id) {
    try {
        const [rows] = await pool.query(`
            SELECT nombre_evento 
            FROM eventos
            WHERE id_propietario = ?
        `, [id])
        return rows[0]
        
    } catch (error) {
        console.error("Error al obtener los eventos del usuario:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}


export async function getEventoIdByName(nombre) {
    try {
        const [rows] = await pool.query(
            "SELECT id FROM eventos WHERE nombre_evento = ? LIMIT 1", 
            [nombre]
        );

        // Verifica si el usuario existe
        if (rows.length > 0) {
            return rows[0].id; // Retorna el ID del usuario encontrado
        } else {
            return null; // Si no encuentra el usuario, retorna null
        }
    } catch (error) {
        console.error("Error al obtener el ID del evento:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}


export async function getEventoFromUser(id_user, nombre_evento) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM eventos
        WHERE nombre_evento = ? && id_propietario = ?
        `, [ nombre_evento, id_user])
        return rows[0]
}

export async function createEventos(nombre_evento, descripcion,fecha, ubicacion, aforo_maximo, precio_entrada, id_propietario, estado) {
    const [result] = await pool.query(`
    INSERT INTO eventos (nombre_evento, descripcion,fecha, ubicacion, aforo_maximo, precio_entrada, id_propietario, estado)
    VALUES (?,?,?,?,?,?,?,?)
    `, [nombre_evento, descripcion,fecha, ubicacion, aforo_maximo, precio_entrada, id_propietario, estado])
    return result.insertId;
}

export async function deleteEvento(id) {
    try {
        const [result] = await pool.query(`
          DELETE FROM eventos WHERE id = ?;`,
        [id])
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleteEvento:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

export async function cambioAtributo(atributo, valor, id_evento) {
    try {
        const query = `
           UPDATE Eventos SET ${atributo} = ? WHERE id = ?;
        `;  
        const [result] = await pool.query(query, [valor, id_evento]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error en cambioAtributo:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}


// const nota = await deleteEvento(5);


// const nota = await getEventoFromUser(1,'arribada')

// const now = new Date();
// const timestampSQL = now.toISOString().slice(0, 19).replace("T", " ");
// const nota = await createEventos(
//     'arribada', 'h', timestampSQL, 'vigo', 300, 5, 1, 'activo')
// console.log(nota)