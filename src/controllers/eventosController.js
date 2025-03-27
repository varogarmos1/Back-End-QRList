import {
    getAllEventosFromOrg,
    getEventoByIdFrom,
    getEventoByCodigo,
    createEvento,
    updateEvento,
    deleteEvento
} from '../models/eventosModel.js';
import { getOrganizacionByCodigo } from '../models/organizacionModel.js';
import {generarCodigo} from '../controllers/organizacionController.js';  

// Obtener todos los eventos de una organización
export async function getEventos(req, res) {
    try {
        const { codigo_org } = req.params;
        console.log(codigo_org);
        const organizacion = await getOrganizacionByCodigo(codigo_org);
        if (!organizacion) {
            return res.status(404).json({ error: "Organización no encontrada" });
        }
        const eventos = await getAllEventosFromOrg(organizacion.id);
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los eventos" });
    }
}

// // Obtener un evento por ID
// export async function getEventoById(req, res) {
//     try {
//         const { id } = req.params;
//         const evento = await getEventoByIdFrom(id);
//         if (!evento) {
//             return res.status(404).json({ error: "Evento no encontrado" });
//         }
//         res.json(evento);
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener el evento" });
//     }
// }

// Obtener un evento por código
export async function getEventoByCodigoController(req, res) {
    try {
        const { codigo } = req.params;
        const evento = await getEventoByCodigo(codigo);
        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }
        res.json(evento);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el evento" });
    }
}

// Crear un nuevo evento
export async function createNewEvento(req, res) {
    console.log();
    try {
        const evento = req.body;

        const codigo = await generarCodigo(evento.nombre_evento);
        evento.codigo = codigo;

        console.log(evento);

        const {codigo_org} = req.params;
        const organizacion = await getOrganizacionByCodigo(codigo_org);

        console.log(organizacion.id);


        const newEventoId = await createEvento(evento,organizacion.id);
        res.status(201).json({ id: newEventoId });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el evento" });
    }
}

// Actualizar un evento existente
export async function updateExistingEvento(req, res) {
    try {
        const { codigo_evento } = req.params;
        const evento = await getEventoByCodigo(codigo_evento);
        const eventoActualizado = req.body;
        await updateEvento(evento.id, eventoActualizado);
        res.json({ message: "Evento actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el evento" });
    }
}

// Eliminar un evento por ID
export async function deleteEventoById(req, res) {
    try {
        const { codigo_evento } = req.params;
        const evento = await getEventoByCodigo(codigo_evento);
        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }
        await deleteEvento(evento.id);
        res.json({ message: "Evento eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el evento" });
    }
}
