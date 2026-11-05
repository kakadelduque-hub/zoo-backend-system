const tentativas = new Map(); // ip -> { total, ate }
const MAX = 5;
const JANELA = 15 * 60 * 1000; // 15 minutos

exports.limiteLogin = (req, res, next) => {
  const agora = Date.now();
  const reg = tentativas.get(req.ip);
  if (reg && agora < reg.ate && reg.total >= MAX) {
    return res.status(429).render('erro', { mensagem: 'Muitas tentativas. Aguarde 15 minutos.' });
  }
  next();
};

exports.registrarFalha = (ip) => {
  const agora = Date.now();
  const reg = tentativas.get(ip);
  if (!reg || agora > reg.ate) tentativas.set(ip, { total: 1, ate: agora + JANELA });
  else reg.total++;
};

exports.limparFalhas = (ip) => tentativas.delete(ip);