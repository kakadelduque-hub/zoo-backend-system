require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');

const app = express();
const producao = process.env.NODE_ENV === 'production';

if (producao) app.set('trust proxy', 1); // Render fica atrás de um proxy

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.urlencoded({ extended: false })); // lê dados de formulários
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,                 // JavaScript do navegador não lê o cookie
    sameSite: 'lax',
    secure: producao,               // só HTTPS em produção
    maxAge: 1000 * 60 * 60 * 2      // 2 horas
  }
}));

app.use((req, res, next) => {       // cabeçalhos de segurança
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});

app.use(require('./middlewares/locals'));
app.use(require('./middlewares/csrf'));

app.use('/', require('./routes/publico'));
app.use('/', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

app.use((req, res) => res.status(404).render('erro', { mensagem: 'Página não encontrada.' }));

app.use((err, req, res, next) => {  // erros inesperados
  console.error(err);
  res.status(500).render('erro', { mensagem: 'Erro interno do servidor.' });
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log('Servidor em http://localhost:' + porta));