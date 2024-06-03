const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

let clientes = [];

router.get('/cesar', (req, res) => {
  res.render('cesar');
});

router.post('/add-client', (req, res) => {
  const { usuarioId, nombre, empresa, correo, telefono, industria, tamano, direccion } = req.body;
  clientes.push({
    usuarioId, 
    nombre, 
    empresa, 
    'correo electronico': correo, 
    telefono, 
    industria, 
    'tamaño de la empresa': tamano,
    direccion
  });
  res.redirect('/clientes');
});


router.get('/clientes', (req, res) => {
  res.render('clientes', { clientes });
});

module.exports = router;


