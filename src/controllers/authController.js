import { getUserByEmail, createUser } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export async function signUp(req, res) {
    const { nombre, correo, contraseña, rol } = req.body;

    try {
        const nuevoUsuario = await createUser(nombre, correo, contraseña, rol);
        res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: 'Error en el registro' });
    }
}

export async function login(req, res) {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await getUserByEmail(correo);
        if (!usuario || usuario.contraseña !== contraseña) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Generar token con ID y rol
        const token = jwt.sign(
            {
                id: usuario.id,
                correo: usuario.correo,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login' });
    }
}
