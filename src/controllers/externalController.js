const pool = require('../config/db');

const poblarProductos = async (request, response) => {
    try {
        // Fetch FakeStoreApi
        const apiFetch = await fetch('http://fakestoreapi.com/products');
        const products = await apiFetch.json();

        let inserciones = 0;
        // Destructurar el objeto
        for(const product of products){
            
            const { title, price, description, image, category} = product;

            const stock = Math.floor(Math.random() * 50) + 1;

            // --- INICIO LÓGICA CATEGORÍA ---
            let id_categoria;
            
            // Verificar si la categoría ya existe
            const catResult = await pool.query('SELECT id FROM Categoria WHERE nombre = $1', [category]);

            if (catResult.rows.length > 0) {
                // Si existe, tomamos el ID
                id_categoria = catResult.rows[0].id;
            } else {
                // Si no existe, la insertamos y devolvemos el ID creado
                const newCat = await pool.query('INSERT INTO Categoria (nombre) VALUES ($1) RETURNING id', [category]);
                id_categoria = newCat.rows[0].id;
            }
            // --- FIN LÓGICA CATEGORÍA ---

            const result = await pool.query('SELECT * FROM productos');
            
            console.log(result.rows);

            
            const query = `
                INSERT INTO productos
                (nombre, precio, stock, descripcion, imagen_url, id_categoria)
                VALUES ($1, $2, $3, $4, $5, $6)
            `

            await pool.query(query, [title, price, stock, description, image, id_categoria]);

            inserciones++;
        }
        response.status(200).json(
            {
                mensaje: "Carga masiva exitosa", 
                cantidad: inserciones
            }
        );
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({error: error.message})
    }
};

module.exports = { poblarProductos };