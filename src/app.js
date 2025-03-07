// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Passe para poder usar os métodos PUT e DELETE
const session = require('express-session');

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necessário para os arquivos estáticos na pasta /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Para poder passar o method="POST" no formulário por PUT e DELETE
app.use( //17-05-2022: Incluído na aula ao Vivo com o professor Sergio Moura.
  session({ //gera um cookie connect.sid ? cria um objeto session na req.?
    secret: 'SEGREDO',
    resave: 'yes',
    saveUninitialized: true,
    // store: existe alguma opção (ver na documentação), na qual salva as informações da session.
  })
);
//objetivo é passar a salvar as buscas na session e não mais nos cookies. Sei lá qual a utilidade disso.

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define a localização da pasta das Views



// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require('./routes/main'); // Rotas main
const productsRouter = require('./routes/products'); // Rotas /products

app.use('/', mainRouter);
app.use('/products', productsRouter);



// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
