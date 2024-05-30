const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;


app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Add a new user
app.post('/add-user', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            return res.status(500).send('Error adding user to the database.');
        }
        res.send('User added successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving users from the database.');
        }
        res.json(results);
    });
});

app.get('/users', (req, res) => {
    const filter = req.query.filter ? `%${req.query.filter}%` : '%';
    const query = 'SELECT * FROM users WHERE name LIKE ?';
    db.query(query, [filter], (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving users from the database.');
        }
        res.json(results);
    });
});
