const Animal = require('../models/animalModel');

const naoEncontrado = (res) =>
  res.status(404).render('erro', { mensagem: 'Animal não encontrado.' });

exports.home = async (req, res) => {
  const animais = (await Animal.listar()).slice(0, 3);
  res.render('index', { animais });
};

exports.catalogo = async (req, res) => {
  const q = String(req.query.q || '').trim().slice(0, 50);
  const animais = await Animal.listar(q);
  res.render('animais', { animais, q });
};

exports.detalhe = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return naoEncontrado(res);
  const animal = await Animal.buscarPorId(id);
  if (!animal) return naoEncontrado(res);
  res.render('detalhe', { animal });
};