const Animal = require('../models/animalModel');
const validar = require('../utils/validar');

const idDe = (req) => Number(req.params.id);

async function mostrarForm(res, { animal, erros, acao, titulo, status = 200 }) {
  const categorias = await Animal.categorias();
  res.status(status).render('admin/form', { animal, categorias, erros, acao, titulo });
}

exports.painel = async (req, res) => {
  res.render('admin/painel', { animais: await Animal.listar() });
};

exports.formNovo = (req, res) =>
  mostrarForm(res, { animal: {}, erros: [], acao: '/admin/animais/novo', titulo: 'Cadastrar animal' });

exports.criar = async (req, res) => {
  const { d, erros } = validar.animal(req.body);
  if (erros.length) {
    return mostrarForm(res, { animal: d, erros, acao: '/admin/animais/novo', titulo: 'Cadastrar animal', status: 400 });
  }
  await Animal.criar(d);
  req.session.flash = { tipo: 'ok', texto: 'Animal cadastrado!' };
  res.redirect('/admin');
};

exports.formEditar = async (req, res) => {
  const id = idDe(req);
  const animal = Number.isInteger(id) ? await Animal.buscarPorId(id) : null;
  if (!animal) return res.status(404).render('erro', { mensagem: 'Animal não encontrado.' });
  mostrarForm(res, { animal, erros: [], acao: '/admin/animais/' + id + '/editar', titulo: 'Editar animal' });
};

exports.atualizar = async (req, res) => {
  const id = idDe(req);
  if (!Number.isInteger(id)) return res.status(404).render('erro', { mensagem: 'Animal não encontrado.' });
  const { d, erros } = validar.animal(req.body);
  if (erros.length) {
    return mostrarForm(res, { animal: { ...d, id }, erros, acao: '/admin/animais/' + id + '/editar', titulo: 'Editar animal', status: 400 });
  }
  await Animal.atualizar(id, d);
  req.session.flash = { tipo: 'ok', texto: 'Animal atualizado!' };
  res.redirect('/admin');
};

exports.excluir = async (req, res) => {
  const id = idDe(req);
  if (Number.isInteger(id)) await Animal.excluir(id);
  req.session.flash = { tipo: 'ok', texto: 'Animal excluído.' };
  res.redirect('/admin');
};