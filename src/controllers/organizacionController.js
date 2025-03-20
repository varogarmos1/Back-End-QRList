import {
    createOrganizacion,
    getOrganizacionByCodigo,
    getOrganizacionIdByName,
    updateOrganizacion,
    deleteOrganizacion
} from '../models/organizacionModel.js';

// Función auxiliar para transformar el nombre de la organización
async function generarCodigo(nombre) {
    // Convertir a minúsculas
    let codigo = nombre.toLowerCase();
    // Eliminar acentos
    codigo = codigo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Reemplazar espacios en blanco con guiones
    codigo = codigo.replace(/\s+/g, '-');
    return codigo;
}

export async function createOrganizacionController(req, res) {
    const { nombre, descripcion } = req.body;
    const { id } = req.usuario;
    try {
        // Generar el código de la organización
        const codigo = await generarCodigo(nombre);
        const id_organizacion = await createOrganizacion(nombre, descripcion, codigo, id );
        res.status(201).json({ id_organizacion });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear organización' });
    }
}

export async function getOrganizacionByCodigoController(req, res) {
    const { codigo } = req.params;
    if(req.pertenece === true){
        try {
            const organizacion = await getOrganizacionByCodigo(codigo);
            if (organizacion) {
                res.status(200).json(organizacion);
            } else {
                res.status(404).json({ error: 'Organización no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener organización' });
        }
    }
}

export async function updateOrganizacionController(req, res) {
    const { codigo } = req.params;
    console.log('Actualizando organización', codigo);
    const { nombre, descripcion } = req.body;
    console.log('Datos:', nombre, descripcion);
    try {
        const affectedRows = await updateOrganizacion(codigo, nombre, descripcion);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Organización actualizada' });
        } else {
            res.status(404).json({ error: 'Organización no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar organización' });
    }
}

export async function deleteOrganizacionController(req, res) {
    const { codigo } = req.params;
    try {
        const affectedRows = await deleteOrganizacion(codigo);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Organización eliminada' });
        } else {
            res.status(404).json({ error: 'Organización no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar organización' });
    }
}
