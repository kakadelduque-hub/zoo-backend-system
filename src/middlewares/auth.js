exports.autenticado = (req, res, next) => {
  if (!req.session.usuario) return res.redirect('/login');
  next();
};

exports.apenasAdmin = (req, res, next) => {
  if (!req.session.usuario) return res.redirect('/login');
  if (req.session.usuario.perfil !== 'admin') {
    return res.status(403).render('erro', { mensagem: 'Acesso restrito a administradores.' });
  }
  next();
};