const express = require('express');
const router = express.Router();
const { obtenerConexion } = require('../database/conexion');

router.post('/', async (req, res) => {
    try {
        const connection = await obtenerConexion();
        const userId = req.user.userId; // Suponiendo que tienes el ID del usuario en req.user.userId

        // Obtén los datos del cuerpo de la solicitud
        const {titulo, descripcion, estado, clienteID } = req.body;

        // Construye el array de valores para la inserción
        const values = [[titulo, descripcion, estado, clienteID]];

        // Query para insertar los datos en la tabla agregar_oportunidades
        const insertarAgregarOportunidades = "INSERT INTO agregar_oportunidades (titulo, descripcion, estado, clienteID) VALUES ?";

        // Ejecutar la consulta SQL
        connection.query(insertarAgregarOportunidades, [values], async (error, results, fields) => {
            if (error) {
                console.error('Error al insertar en la tabla agregar_oportunidades:', error);
                return res.status(500).send('Error al insertar en la tabla agregar_oportunidades');
            }
            console.log('Datos insertados en la tabla agregar_oportunidades:', results);
            
            // Cerrar la conexión a la base de datos
            connection.end();

            // Enviar una respuesta al cliente
            res.status(200).send('Datos insertados correctamente en la tabla agregar_oportunidades');
        });
    } catch (error) {
        console.error('Error al obtener la conexión:', error);
        res.status(500).send('Error al obtener la conexión');
    }
});

module.exports = router;
