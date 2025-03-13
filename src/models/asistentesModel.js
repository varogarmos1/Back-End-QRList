import {pool} from '../config/db.js';

export async function getAsistente(id_evento, nombre_apellidos) {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM asistentes
            WHERE id_evento = ? AND nombre_apellidos = ?
        `, [id_evento, nombre_apellidos]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener asistente:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}


export async function getAllAsistentes(id_evento) {
    try {
        const [rows] = await pool.query(`
            SELECT nombre_apellidos, estado_pago
            FROM asistentes
            WHERE id_evento = ?
            `, [id_evento]);
        return rows[0]    
    } catch (error) {
        
    }
}

export async function cambioEstado(correo,id_evento, estado) {
    try {
        const [result] = await pool.query(`
           UPDATE asistentes SET estado_pago = ? WHERE correo = ? && id_evento = ?;
            `, [estado, correo,id_evento])
            return result.insertId;
          
        } catch (error) {
            console.error("Error postAsistNoReg:", error);
          throw error; // Lanza el error para manejarlo en otro lugar
          }
}
export async function postAsistNoReg(id_evento, nombre_apellidos, correo){
    try {
        const [result] = await pool.query(`
          INSERT INTO asistentes (id_evento, nombre_apellidos, correo)
          VALUES (?, ?, ?)
          `, [id_evento, nombre_apellidos, correo])
          return result.insertId;
        
      } catch (error) {
          console.error("Error postAsistNoReg:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
        }
}

export async function postAsistReg(id_evento, id_usuario, nombre_apellidos, correo){
    try {
        const [result] = await pool.query(`
          INSERT INTO asistentes (id_evento,id_usuario, nombre_apellidos, correo)
          VALUES (?, ?,?, ?)
          `, [id_evento,id_usuario, nombre_apellidos, correo])
          return result.insertId;
        
      } catch (error) {
          console.error("Error postAsistReg:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
        }
}

export async function deleteAsistente(id) {
    try {
        const [result] = await pool.query(`
          DELETE FROM Asistentes WHERE id = ?;`,
        [id])
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleteAsistente:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

// const nota = await getAllAsistentes(1)
// const nota = await postAsistNoReg(1, "pedro", "pedrogarmos@gmail.com")
// const nota = await cambioEstado("pedrogarmos@gmail.com", 1, "confirmado");
// console.log(nota)