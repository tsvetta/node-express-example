// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import blogRoutes from './routes/blogRoutes.js'
import { readFileSync } from 'fs';

const app = express();

const mongoPass = readFileSync('./mongo-pass');
const dbURI = `mongodb+srv://tsvetta:${mongoPass}@cluster0.ie3yjvk.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbURI)
    .then(result => {
        console.log('Connected to Mongo DB');
        app.listen(3000);
    })
    .catch(err => console.error(err));

app.set('view engine', 'ejs');

app
    .use(express.static('public'))
    .use(express.urlencoded({ extended: true }))
    .use(morgan('dev'));

app
    .use((req, res, next) => {
        res.locals.path = req.path;
        next();
    })
    .get('/', (req, res) => {
        res.redirect('/blogs');
    })
    .get('/about', (req, res) => {
        res.render('about', {
            title: 'About',
        });
    })
    .get('/about-us', (req, res) => {
        res.redirect('/about');
    })
    .use('/blogs', blogRoutes)
    .use((req, res) => {
        res
            .status(404)
            .render('404', { title: '404' });
    });