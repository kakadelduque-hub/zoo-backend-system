const crypto = require('crypto');

module.exports = (req, res, next) => {
  if (!req.session.csrf) req.session.csrf = crypto.randomBytes(24).toString('hex');
  res.locals.csrf = req.session.csrf;

  if (req.method === 'POST') {
    const enviado = (req.body && req.body._csrf) || '';
    if (enviado !== req.session.csrf) {
      return res.status(403).render('erro', { mensagem: 'Formulário inválido ou expirado.' });
    }
  }
  next();
};