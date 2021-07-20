const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const usersList = [];

app.get('/', (req, res) => {
    res.render('users', {
        pageTitle: 'Users',
        path: '/',
        usersList,
    });
});

app.get('/add-user', (req, res) => {
    res.render('add-user', {
        pageTitle: 'Add New User',
        path: '/add-user',
    });
});

app.post('/add-user', (req, res) => {
    const { name } = req.body;
    usersList.push(name);
    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).render('not-found', { pageTitle: 'Not Found', path: '' });
});

app.listen(3000);