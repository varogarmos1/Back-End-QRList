

export function validarCampos(req, res, next) {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'Correo electrónico no válido' });
    }

    if (contraseña.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    next(); // Si todo está bien, pasamos al siguiente middleware/controlador
}
