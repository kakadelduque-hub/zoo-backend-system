const router = require('express').Router();
const c = require('../controllers/adminController');
const { apenasAdmin } = require('../middlewares/auth');

router.use(apenasAdmin);   // TUDO abaixo exige ser admin

router.get('/', c.painel);
router.get('/animais/novo', c.formNovo);
router.post('/animais/novo', c.criar);
router.get('/animais/:id/editar', c.formEditar);
router.post('/animais/:id/editar', c.atualizar);
router.post('/animais/:id/excluir', c.excluir);

module.exports = router;