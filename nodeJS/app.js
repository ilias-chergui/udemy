const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });
const upload = multer();

const PORT = 3000;

let frenchMovies = [];

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
    
    frenchMovies = [
        { title: 'Harry Potter 1', year: 2001},
        { title: 'Harry Potter 2', year: 2003},
        { title: 'Transformers', year: 2005},
        { title: 'Transformers 2', year: 2006},
        { title: 'Transformers 3', year: 2007}
    ];

    res.render('movies', { movies: frenchMovies, title1: title1, title2: title2});
});

app.post('/movies', upload.fields([]), (req, res) => {
    if (!req.body) { // Si pas de body, on renvoi erreur 500
        return res.sendStatus(500);
    } else {
        const formData = req.body;
        console.log('formData: ', formData);

        const newMovie = { title : req.body.movieTitle, year : req.body.movieYear };
        frenchMovies = [...frenchMovies, newMovie];
        res.sendStatus(201);
    }
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