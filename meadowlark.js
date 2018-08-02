
// Этот файл равносилен файлу app.js и назван по другому из-за рекомендации книги
// Файл - точка входа в приложение
//Репозиторий:
// git clone https://github.com/EthanRBrown/web-development-with-node-and-express

const express = require('express');
const app = express();
/*
Выносим этот код в отдельный модуль в папку lib
var fortunes = [ 
				"Победи свои страхи, или они победят тебя.",
				"Рекам нужны истоки.",
				"Не бойся неведомого.",
				"Тебя ждет приятный сюрприз.",
				"Будь проще везде, где только можно."
				];*/
var fortune = require('./lib/fortune.js');

//Установка механизма представления hadlebars
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3002);
app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'prodaction' && req.query.test ==='1';
	next();
});

//Здесь находятся маршруты
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	/*Выносим этот код в отдельный модуль в папку lib
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];*/
	res.render('about', {fortune: fortune.getFortune()});
});

//Пользовательская страница 404
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

//Обработчик ошибки 500 (Промежуточное ПО)
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express запущен на локалхосте: ' + app.get('port') + ': Нажмите Ctrl+C для завершения')
});