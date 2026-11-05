const pool = require('../config/db');

exports.buscarPorEmail = async (email) => {
  const [linhas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return linhas[0] || null;
};

exports.criar = async (nome, email, senhaHash) => {
  await pool.query(
    'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome, email, senhaHash]
  );
};