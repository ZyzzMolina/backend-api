const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (request, response) => {

    const { email, password } = request.body;

    try {
        const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (userExists.rows.length > 0) {
            return response.status(400).json({ error: 'El usuario ya existe' });
        }       

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, passwordHash]
        );

        response.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: newUser.rows[0]
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error en el servidor" });
    }
};

const login = async (request, response) => {
    const { email, password } = request.body;   
    try {
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return response.status(400).json({ error: 'Credenciales Invalidas (Email)' });
        }

        const usuario = user.rows[0];

        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            return response.status(400).json({ error: 'Credenciales Invalidas (Password)' });
        }

        const payload = {
            id: usuario.id,
            rol: usuario.rol,
            email: usuario.email
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        response.json({ token });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error en el servidor" });
    }
};




module.exports = {
    register,
    login
};