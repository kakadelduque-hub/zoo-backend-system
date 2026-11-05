const router = require('express').Router();
const c = require('../controllers/authController');
const { limiteLogin } = require('../middlewares/limiteLogin');

router.get('/cadastro', c.formCadastro);
router.post('/cadastro', c.cadastrar);
router.get('/login', c.formLogin);
router.post('/login', limiteLogin, c.login);
router.post('/logout', c.logout);

module.exports = router;