const router = require('express').Router();
const c = require('../controllers/publicoController');

router.get('/', c.home);
router.get('/animais', c.catalogo);
router.get('/animais/:id', c.detalhe);

module.exports = router;