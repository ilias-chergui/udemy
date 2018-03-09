const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });
const PORT = 3000;


app.use('/public', express.static('public'));

// pour utiliser les template ejs on set le chemin des templates
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movies', (req, res) => {
    const title1 = 'Derniers ajouts :';
    const title2 = 'Ajouter des films :';
    const frenchMovies = [
        { title: 'babar et ses amis', year: 1998},
        { title: 'OuiOui et son taxi', year: 2000},
        { title: 'Transformers', year: 2005},
        { title: 'Transformers 2', year: 2006},
        { title: 'Transformers 3', year: 2007}
    ];

    res.render('movies', { movies: frenchMovies, title1: title1, title2: title2});
});

app.post('/movies', urlencoded, (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
});

app.get('/movies/:id/:title', (req, res) => {
    const id = req.params.id;
    const title = req.params.title;
    
    if (id === "add") {
        res.send('Cette page servira à ajouter de nouveaux films');
    } 
    else {
        res.render('movies-details', { movieID: id, movieTitle: title });
    } 
});

app.listen(PORT);