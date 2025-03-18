import { getUserByEmail, postUser } from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

export const validateSignUp = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

export async function signUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, correo, contraseña } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const nuevoUsuario = await postUser(nombre, correo, hashedPassword);
        res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: 'Error en el registro' });
    }
}

export const validateLogin = [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').notEmpty().withMessage('La contraseña es requerida')
];

export async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { correo, contraseña } = req.body;

    try {
        const usuario = await getUserByEmail(correo);
        if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
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
