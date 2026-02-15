const express = require('express');
const cors = require('cors');
const path = require('path');
const route  = require('./routes/productoRoute');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/productos', route);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Servicio arriba"));