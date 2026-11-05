const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarioModel');
const validar = require('../utils/validar');
const { registrarFalha, limparFalhas } = require('../middlewares/limiteLogin');

exports.formCadastro = (req, res) => res.render('auth/cadastro', { erros: [], dados: {} });

exports.cadastrar = async (req, res) => {
  const { d, erros } = validar.cadastro(req.body);
  if (!erros.length && await Usuario.buscarPorEmail(d.email)) erros.push('E-mail já cadastrado.');
  if (erros.length) return res.status(400).render('auth/cadastro', { erros, dados: d });

  const hash = await bcrypt.hash(d.senha, 12);   // 12 = custo do hash
  await Usuario.criar(d.nome, d.email, hash);
  req.session.flash = { tipo: 'ok', texto: 'Conta criada! Faça login.' };
  res.redirect('/login');
};

exports.formLogin = (req, res) => res.render('auth/login', { erro: null });

exports.login = async (req, res, next) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const senha = req.body.senha || '';
  const u = await Usuario.buscarPorEmail(email);
  const ok = u && await bcrypt.compare(senha, u.senha_hash);

  if (!ok) {
    registrarFalha(req.ip);
    // mesma mensagem para e-mail ou senha errados (não revela qual existe)
    return res.status(401).render('auth/login', { erro: 'E-mail ou senha incorretos.' });
  }
  limparFalhas(req.ip);
  req.session.regenerate((err) => {      // novo id de sessão evita fixação de sessão
    if (err) return next(err);
    req.session.usuario = { id: u.id, nome: u.nome, perfil: u.perfil };
    res.redirect(u.perfil === 'admin' ? '/admin' : '/animais');
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};