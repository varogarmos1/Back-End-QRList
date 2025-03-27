import { pool } from '../config/db.js';

// Obtener todos los eventos
export async function getAllEventosFromOrg(id_organizacion) {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM Eventos 
            WHERE id_organizacion = ?`,
            [id_organizacion]);
        return rows;
    } catch (error) {
        console.error("Error al obtener los eventos de la organizacion:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

// Obtener un evento por ID
export async function getEventoByIdFrom(id) {
    try{

        const [rows] = await pool.query(`SELECT * FROM Eventos WHERE id = ?`, [id]);
        return rows[0];
    }catch(error){
        console.error("Error al obtener el evento:", error);
        throw error; // Lanza el error para manejarlo en otro lugar 
    }  
}

// Obtener un evento por codigo
export async function getEventoByCodigo(codigo) {
    try{

        const [rows] = await pool.query(`
            SELECT * FROM Eventos WHERE codigo = ?`, [codigo]);
            return rows[0];
        }catch(error){ 
            console.error("Error al obtener el evento:", error);
            throw error; // Lanza el error para manejarlo en otro lugar
        }
    
}
// Crear un nuevo evento
export async function createEvento(evento, id_organizacion) {
    try{
        const { nombre_evento, descripcion, codigo, fecha, ubicacion, aforo_maximo, estado } = evento;
        const [result] = await pool.query(
            `INSERT INTO Eventos (nombre_evento, descripcion, codigo, fecha, ubicacion, aforo_maximo, id_organizacion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre_evento, descripcion, codigo, fecha, ubicacion, aforo_maximo, id_organizacion, estado]
        );
        return result.insertId;
    }catch(error){
        console.error("Error al crear evento:", error);
        throw error; // Lanza el error para manejarlo en otro lugar 
        }
}

// Actualizar un evento existente
export async function updateEvento(id, evento) {
    try{
        const { nombre_evento, descripcion, fecha, ubicacion, aforo_maximo, id_organizacion, estado } = evento;

        // Obtener el evento actual de la base de datos
        const eventoActual = await getEventoByIdFrom(id);

        // Usar los valores actuales si no se proporcionan nuevos valores
        const nuevoNombreEvento = nombre_evento !== undefined ? nombre_evento : eventoActual.nombre_evento;
        const nuevaDescripcion = descripcion !== undefined ? descripcion : eventoActual.descripcion;
        const nuevaFecha = fecha !== undefined ? fecha : eventoActual.fecha;
        const nuevaUbicacion = ubicacion !== undefined ? ubicacion : eventoActual.ubicacion;
        const nuevoAforoMaximo = aforo_maximo !== undefined ? aforo_maximo : eventoActual.aforo_maximo;
        const nuevoIdOrganizacion = id_organizacion !== undefined ? id_organizacion : eventoActual.id_organizacion;
        const nuevoEstado = estado !== undefined ? estado : eventoActual.estado;

        await pool.query(
            `UPDATE Eventos SET nombre_evento = ?, descripcion = ?, fecha = ?, ubicacion = ?, aforo_maximo = ?, id_organizacion = ?, estado = ? WHERE id = ?`,
            [nuevoNombreEvento, nuevaDescripcion, nuevaFecha, nuevaUbicacion, nuevoAforoMaximo, nuevoIdOrganizacion, nuevoEstado, id]
        );
    }catch(error){ 
        console.error("Error al actualizar evento:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

// Eliminar un evento por ID
export async function deleteEvento(id) {
    try{
        await pool.query(`DELETE FROM Eventos WHERE id = ?`, [id]);
    }catch(error){
        console.error("Error al eliminar evento:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}
