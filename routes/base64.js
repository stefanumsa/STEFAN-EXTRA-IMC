const express = require('express');
const router = express.Router();
const { obtenerConexion } = require('../database/conexion');

router.post('/', async (req, res) => {
    try {
        const connection = await obtenerConexion();
        const usuarioId = req.user.userId; // Suponiendo que tienes el ID del usuario en req.user.userId

        // Obtén los datos del cuerpo de la solicitud
        const {   tipo, telefono, fecha, descripcion } = req.body;

        // Construye el array de valores para la inserción
        const values = [[usuarioId, tipo, telefono, fecha, descripcion]];

        // Query para insertar los datos en la tabla agregar_interacciones
        const insertarAgregarInteracciones = "INSERT INTO agregar_interacciones (usuarioId, tipo, telefono, fecha, descripcion) VALUES ?";
        
        // Ejecutar la consulta SQL
        connection.query(insertarAgregarInteracciones, [values], (error, results, fields) => {
            if (error) {
                console.error('Error al insertar en la tabla agregar_interacciones:', error);
                return res.status(500).send('Error al insertar en la tabla agregar_interacciones');
            }
            console.log('Datos insertados en la tabla agregar_interacciones:', results);
            res.status(200).send('Datos insertados en la tabla agregar_interacciones');
        });
    } catch (error) {
        console.error('Error al obtener la conexión:', error);
        res.status(500).send('Error al obtener la conexión');
    }
});

module.exports = router;
