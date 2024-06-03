const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

let informes = [];

router.get('/hexadecimal', (req, res) => {
  res.render('hexadecimal');
});

// Ruta para manejar la solicitud POST y almacenar los informes
router.post('/submit-venta', (req, res) => {
  const informe = {
    usuarioId: req.body.usuarioId,
    clienteNombre: req.body.clienteNombre,
    fechaVenta: req.body.fechaVenta,
    montoVenta: req.body.montoVenta,
    productoVendido: req.body.productoVendido,
    satisfaccionCliente: req.body.satisfaccionCliente,
    comentariosCliente: req.body.comentariosCliente
  };

  informes.push(informe);

  res.redirect('/informes');
});

// Ruta para mostrar todos los informes (informes.pug)
router.get('/informes', (req, res) => {
  res.render('informes', { informes });
});

module.exports = router;
