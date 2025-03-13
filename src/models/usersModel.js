import {pool} from '../config/db.js';


export async function getUser(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    WHERE id = ?
    `, [id])
    return rows[0]
  }
  
  // const note = await getUser(1)
  // console.log(note)

export async function postUser(nombre_apellidos, correo, contraseña, rol) {
  try {
    const [result] = await pool.query(`
      INSERT INTO users (nombre_apellidos, correo, contraseña, rol)
      VALUES (?, ?, ?, ?)
      `, [nombre_apellidos, correo, contraseña, rol])
      return result.insertId;
    
  } catch (error) {
      console.error("Error al crear usuario:", error);
    throw error; // Lanza el error para manejarlo en otro lugar
    }
}


  export async function getUserIdByName(nombre) {
      try {
          const [rows] = await pool.query(
              "SELECT id FROM users WHERE nombre_apellidos = ? LIMIT 1", 
              [nombre]
          );
  
          // Verifica si el usuario existe
          if (rows.length > 0) {
              return rows[0].id; // Retorna el ID del usuario encontrado
          } else {
              return null; // Si no encuentra el usuario, retorna null
          }
      } catch (error) {
          console.error("Error al obtener el ID del usuario:", error);
          throw error; // Lanza el error para manejarlo en otro lugar
      }
  }

  export async function cambioAtributo(atributo, valor, id_usuario) {
    try {
        const query = `
           UPDATE users SET ${atributo} = ? WHERE id = ?;
        `;  
        const [result] = await pool.query(query, [valor, id_usuario]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error en cambioAtributo:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}

  export async function getUserNamebyId(id) {
    try {
        const [rows] = await pool.query(
            "SELECT nombre_apellidos FROM users WHERE id = ? LIMIT 1", 
            [id]
        );

        // Verifica si el usuario existe
        if (rows.length > 0) {
            return rows[0].nombre_apellidos; // Retorna el ID del usuario encontrado
        } else {
            return null; // Si no encuentra el usuario, retorna null
        }
    } catch (error) {
        console.error("Error al obtener el ID del usuario:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
}
// const nota = await cambioRol(1, "usuario")
// console.log(nota)

  // Buscar usuario por correo
export async function getUserByEmail(correo) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE correo = ?", [correo]);
    return rows.length > 0 ? rows[0] : null;
    
  } catch (error) {
    console.error("Error al obtener el ID del usuario:", error);
    throw error; // Lanza el error para manejarlo en otro lugar
  }
}
  