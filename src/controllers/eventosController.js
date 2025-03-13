import { createEventos, cambioAtributo, deleteEvento, getEventoFromOrganization, getEventosFromOrganization } from '../models/eventosModel';
import { getUserNamebyId } from '../models/userModel';

//POST /api/usuarios/:nombre_usuario/eventos
//Crea un evento para un usuario
export const createEvent = async (req, res) => {
    const { nombre_evento, descripcion, fecha, ubicacion, aforo_maximo, precio_entrada, id_organizacion, estado } = req.body;
    try {
        const id_creador = req.usuario.id;
        const eventId = await createEventos(nombre_evento, descripcion, fecha, ubicacion, aforo_maximo, precio_entrada, id_organizacion, id_creador, estado);
        res.status(201).json({ message: 'Evento creado correctamente', eventId });
    } catch (error) {
        console.error("Error al crear evento:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//PUT /api/usuarios/:nombre_usuario/eventos/:nombre_evento
//Actualiza un atributo de un evento
export const updateEventAttribute = async (req, res) => {
    const { nombre_usuario, nombre_evento } = req.params;
    const { atributo, valor } = req.body;
    try {
        const id_usuario = await getUserNamebyId(nombre_usuario);
        if (!id_usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const evento = await getEventoFromOrganization(id_usuario, nombre_evento);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        const creador = evento.id_creador;
        if (creador !== id_usuario) {
            return res.status(403).json({ message: 'No tiene permiso para modificar este evento' });
        }
        const result = await cambioAtributo(atributo, valor, evento.id);
        if (result === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Atributo del evento actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar atributo del evento:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//DELETE /api/usuarios/:nombre_usuario/eventos/:nombre_evento
//Elimina un evento
export const deleteEvent = async (req, res) => {
    const { nombre_usuario, nombre_evento } = req.params;
    try {
        const id_usuario = await getUserNamebyId(nombre_usuario);
        if (!id_usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const evento = await getEventoFromOrganization(id_usuario, nombre_evento);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        const creador = evento.id_creador;
        if (creador !== id_usuario) {
            return res.status(403).json({ message: 'No tiene permiso para modificar este evento' });
        }
        const result = await deleteEvento(evento.id);
        if (result === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar evento:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Nueva función para obtener un evento específico de una organización concreta
export const getEventFromOrganization = async (req, res) => {
    const { nombre_organizacion, nombre_evento } = req.params;
    try {
        const id_organizacion = await getOrganizacionIdByName(nombre_organizacion);
        if (!id_organizacion) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const evento = await getEventoFromOrganization(id_organizacion, nombre_evento);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(evento);
    } catch (error) {
        console.error("Error al obtener evento:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Nueva función para obtener todos los eventos de una organización concreta
export const getAllEventsFromOrganization = async (req, res) => {
    const { nombre_organizacion } = req.params;
    try {
        const id_organizacion = await getOrganizacionIdByName(nombre_organizacion);
        if (!id_organizacion) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const eventos = await getEventosFromOrganization(id_organizacion);
        res.json(eventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
