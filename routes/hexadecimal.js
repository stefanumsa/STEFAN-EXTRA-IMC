const express = require('express');
const router = express.Router();
const { obtenerConexion } = require('../database/conexion');

router.post('/', async (req, res) => {
    try {
        const connection = await obtenerConexion();
        const usuarioId = req.user.userId; // Suponiendo que tienes el ID del usuario en req.user.userId

        // Obtén los datos del cuerpo de la solicitud
        const {  clienteNombre, fechaVenta, montoVenta, productoVendido, satisfaccionCliente, comentariosCliente } = req.body;

        // Construye el array de valores para la inserción
        const values = [[usuarioId, clienteNombre, fechaVenta, montoVenta, productoVendido, satisfaccionCliente, comentariosCliente]];

        // Query para insertar los datos en la tabla agregar_informes
        const insertarAgregarInformes = "INSERT INTO agregar_informes (usuarioId, clienteNombre, fechaVenta, montoVenta, productoVendido, satisfaccionCliente, comentariosCliente) VALUES ?";
        
        // Ejecutar la consulta SQL
        connection.query(insertarAgregarInformes, [values], (error, results, fields) => {
            if (error) {
                console.error('Error al insertar en la tabla agregar_informes:', error);
                return res.status(500).send('Error al insertar en la tabla agregar_informes');
            }
            console.log('Datos insertados en la tabla agregar_informes:', results);
            res.status(200).send('Datos insertados en la tabla agregar_informes');
        });
    } catch (error) {
        console.error('Error al obtener la conexión:', error);
        res.status(500).send('Error al obtener la conexión');
    }
});

module.exports = router;
