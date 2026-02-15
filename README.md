# Búsqueda de Productos en Tiempo Real

Sistema de búsqueda con Node.js/Express y frontend HTML/JavaScript.

## Instalación

```bash
pnpm install
pnpm run dev
```

Servidor en: `http://localhost:4000`

## Endpoint

```
GET /api/productos/search?q=termino
```

Parámetro requerido: `q` (término de búsqueda)  
Busca en: nombre y descripción (case-insensitive)

## Frontend

Accede a `http://localhost:4000` para usar la tabla de búsqueda.

## Seguridad

- Consultas parametrizadas contra SQL Injection
- Validación de parámetros
- CORS habilitado
- Case-insensitive con ILIKE (PostgreSQL)
