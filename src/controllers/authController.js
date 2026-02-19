const pool = require('../config/db');
const bcrypt = require('bcryptjs');

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
}




module.exports = {
    register
};