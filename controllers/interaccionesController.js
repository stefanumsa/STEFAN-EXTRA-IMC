const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

let interactions = [];

// Ruta para mostrar la pestaña de base64
router.get('/base64', (req, res) => {
  res.render('base64');
});

// Ruta para manejar el registro de nuevas interacciones
router.post('/add-interaccion', (req, res) => {
  const { usuarioID, tipo, telefono, fecha, descripcion } = req.body;
  interactions.push({ usuarioID, tipo, telefono, fecha, descripcion });
  res.redirect('/interacciones');
});

router.get('/interacciones', (req, res) => {
  res.render('interacciones', { interactions });
});

module.exports = router;
