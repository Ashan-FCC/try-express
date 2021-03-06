const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


// app.use((req, res, next) => {
// 	res.render('maintenance.hbs' , {
// 		pageTitle : 'SITE MAINTENANCE',
// 	})

// });

app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next();
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear' , ()=>{ return new Date().getFullYear()} );
hbs.registerHelper('screamIt' , (text) => {
	return text.toUpperCase();
});


app.get('/' , (req, res) => {
	res.render('home.hbs', {
		pageTitle : 'Home Page',
		welcomeMsg : 'hellow! welcome! sawadee'
	});
});

app.get('/about' , (req, res) => {
	res.render('about.hbs', {
		pageTitle : 'About Page'
	});
});

app.get('/projects' , (req, res) => {
	res.render('portfolio.hbs', {
		pageTitle : 'Porfolio'
	});
});

app.listen(port , () => console.log(`Example app listening on port ${port}.`));