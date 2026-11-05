const pool = require('../config/db');

const BASE = 'SELECT a.*, c.nome AS categoria FROM animais a JOIN categorias c ON c.id = a.categoria_id';

exports.listar = async (busca) => {
  let sql = BASE;
  const params = [];
  if (busca) {
    sql += ' WHERE a.nome LIKE ? OR a.especie LIKE ?';
    params.push('%' + busca + '%', '%' + busca + '%');
  }
  sql += ' ORDER BY a.nome';
  const [linhas] = await pool.query(sql, params);
  return linhas;
};

exports.buscarPorId = async (id) => {
  const [linhas] = await pool.query(BASE + ' WHERE a.id = ?', [id]);
  return linhas[0] || null;
};

exports.criar = async (d) => {
  const [r] = await pool.query(
    'INSERT INTO animais (nome, especie, categoria_id, habitat, dieta, descricao, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [d.nome, d.especie, d.categoria_id, d.habitat, d.dieta, d.descricao, d.imagem]
  );
  return r.insertId;
};

exports.atualizar = async (id, d) => {
  await pool.query(
    'UPDATE animais SET nome=?, especie=?, categoria_id=?, habitat=?, dieta=?, descricao=?, imagem=? WHERE id=?',
    [d.nome, d.especie, d.categoria_id, d.habitat, d.dieta, d.descricao, d.imagem, id]
  );
};

exports.excluir = async (id) => {
  await pool.query('DELETE FROM animais WHERE id = ?', [id]);
};

exports.categorias = async () => {
  const [linhas] = await pool.query('SELECT id, nome FROM categorias ORDER BY nome');
  return linhas;
};