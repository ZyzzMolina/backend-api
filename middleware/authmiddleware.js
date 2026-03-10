const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('Authorization'); // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }
    try{
        const tokenlimpio = token.r
        
        
        eplace('Bearer ', ''); // Eliminar el prefijo "Bearer " si está presente
        const decoded = jwt.verify(tokenlimpio, process.env.JWT_SECRET);
        req.user = decoded; // Agregar la información del usuario al objeto de solicitud
        next(); // Continuar con la siguiente función de middleware o ruta
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};
