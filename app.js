var http = require('http');
var express = require('express');
var path = require('path');

var user = require('./routes/user');
var app =express();

var conn = require('express-myconnection');
var mysql = require('mysql');

app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'assets')));

if ('development' - app.get('env')) {
	app.use(express.errorHandler());
};

app.use(
		conn(mysql,{

			host: 'localhost',
			user: 'root',
			password: '',
			port: 3306,
			database:'nodejs'


		},'single')
	);

app.get('/user',user.liatin);
app.get('/user/tambah',user.tambah);
app.post('/user/tambahuser',user.tambah_simpen);
app.get('/user/ubah/:id',user.ubah);
app.post('/user/ubah/:id',user.ubah_simpen);
app.get('/user/hapus/:id',user.hapus);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server Is Running On Port : ' + app.get('port'));
});