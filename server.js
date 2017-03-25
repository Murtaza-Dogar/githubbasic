const express = require('express');
const hbs = require('hbs');
const fs =  require('fs');


var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
	var now = new Date().toString();	
	var log = `${now} : ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n',(err) => {
		if(err)  {

			console.log('Unable to append file');
		}
	}); 
	next();


});

app.use((req,res,next) => {
	res.render('maintenance');

});
hbs.registerHelper('getCurrentYear',() => {
		return new Date().getFullYear() ;
});
app.get('/', (req,res) => {
		
	res.render('landing',{pageTitle : "Landing Page",welcomMessage : "Welcome to Nodejs"})

});

app.get('/about',(req,res) => {

	res.render('about', {pageTitle : 'About Page'});
});

app.get('/bad',(req,res) => {

	res.send( {
		errormessage : 'something bad happened',
		errorcode : '404'
		
	});
});
app.get('/help', (req,res) => {

	res.render('help');
})

app.listen(3000, () => {
	console.log('listening');
})


