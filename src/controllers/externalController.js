const pool = require('../config/db');

const poblarProductos = async (request, response) => {
    try {
        const apiFetch = await fetch('http://fakestoreapi.com/products');
        const products = await apiFetch.json();

        let inserciones = 0;
        
        for(const product of products){
            const { title, price, description, image, category} = product;
            const stock = Math.floor(Math.random() * 50) + 1;
            
            let id_categoria;
            const catResultado = await pool.query('SELECT id FROM Categoria WHERE nombre = $1', [category]);

            if (catResultado.rows.length > 0) {
                id_categoria = catResultado.rows[0].id;
            } else {
                const newCat = await pool.query('INSERT INTO Categoria (nombre) VALUES ($1) RETURNING id', [category]);
                id_categoria = newCat.rows[0].id;
            }

            const query = `
                INSERT INTO productos (nombre, precio, stock, descripcion, imagen_url, id_categoria)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;

            await pool.query(query, [title, price, stock, description, image, id_categoria]);
            inserciones++;
        }

        response.status(200).json({
            mensaje: "Carga masiva exitosa", 
            cantidad: inserciones
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({error: error.message});
    }
};

// COINCIDENCIAS POR STRING PRODUCTOS 
const buscarProductos = async (req, res) => {
    try {
        const { q } = req.query;

        // Validación: Parámetro obligatorio
        if (!q || q.trim() === '') {
            return res.status(400).json({ 
                error: "El parámetro 'q' es requerido y no puede estar vacío" 
            });
        }

        const query = `
            SELECT productos.id, productos.nombre, productos.descripcion, 
                   c.nombre AS categoria, productos.precio, productos.stock
            FROM productos
            INNER JOIN Categoria c ON productos.id_categoria = c.id
            WHERE productos.nombre ILIKE $1 
               OR productos.descripcion ILIKE $1
            ORDER BY productos.nombre ASC
        `;

        const values = [`%${q.trim()}%`];
        const result = await pool.query(query, values);

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// COINCIDENCIAS POR STRING CATEGORIA
const buscarCategoria = async (req, res) => {
    try {
        const { termino } = req.params;

        const query = `
            SELECT id, nombre
            FROM Categoria
            WHERE nombre ILIKE $1
        `;

        const values = [`%${termino}%`];
        const result = await pool.query(query, values);

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductos = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM productos ORDER BY id ASC');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { poblarProductos, buscarProductos, buscarCategoria, getProductos };