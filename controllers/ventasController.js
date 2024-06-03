const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

let ventas = [];

// Ruta para mostrar la pestaña de sustitución
router.get('/sustitucion', (req, res) => {
  res.render('sustitucion', { mensaje: 'Este es el contenido que debería mostrarse.' });
});

// Ruta para mostrar el formulario de sustitución
router.get('/sustitucion', (req, res) => {
  res.render('sustitucion');
});

// Ruta para manejar el registro de nuevas oportunidades
router.post('/ventas', (req, res) => {
  const nuevaVenta = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    clienteID: req.body.clienteID
  };
  ventas.push(nuevaVenta);
  res.redirect('/ventas');
});

// Ruta para mostrar las ventas
router.get('/ventas', (req, res) => {
  res.render('ventas', { ventas: ventas });
});

module.exports = router;
