module.exports = (req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  res.locals.flash = req.session.flash || null; // mensagem de uma vez só
  delete req.session.flash;
  next();
};