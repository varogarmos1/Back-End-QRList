import rateLimit from 'express-rate-limit';

export const limitarPeticiones = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo 100 peticiones por IP
    message: { error: 'Demasiadas solicitudes. Intenta de nuevo más tarde' }
});
