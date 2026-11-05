exports.animal = (b) => {
  const d = {
    nome: (b.nome || '').trim(),
    especie: (b.especie || '').trim(),
    categoria_id: Number(b.categoria_id),
    habitat: (b.habitat || '').trim(),
    dieta: (b.dieta || '').trim(),
    descricao: (b.descricao || '').trim(),
    imagem: (b.imagem || '').trim() || null
  };
  const erros = [];
  if (d.nome.length < 2 || d.nome.length > 100) erros.push('Nome deve ter de 2 a 100 caracteres.');
  if (d.especie.length < 2 || d.especie.length > 150) erros.push('Espécie deve ter de 2 a 150 caracteres.');
  if (!Number.isInteger(d.categoria_id) || d.categoria_id < 1) erros.push('Escolha uma categoria.');
  if (!d.habitat) erros.push('Informe o habitat.');
  if (!d.dieta) erros.push('Informe a dieta.');
  if (d.descricao.length < 10) erros.push('A descrição precisa de pelo menos 10 caracteres.');
  if (d.imagem && !/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/.test(d.imagem)) {
    erros.push('Imagem deve ser um nome de arquivo como leao.jpg.');
  }
  return { d, erros };
};

exports.cadastro = (b) => {
  const d = {
    nome: (b.nome || '').trim(),
    email: (b.email || '').trim().toLowerCase(),
    senha: b.senha || ''
  };
  const erros = [];
  if (d.nome.length < 2) erros.push('Informe seu nome.');
  if (!/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(d.email)) erros.push('E-mail inválido.');
  if (d.senha.length < 8) erros.push('A senha precisa ter pelo menos 8 caracteres.');
  return { d, erros };
};