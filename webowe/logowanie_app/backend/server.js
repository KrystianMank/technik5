// API serwer do logowania 
// v 1.0

// deklaracja importowanych modułów
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

// inicjacja
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());


// łączenie z bazą SQLITE3
const db = new sqlite3.Database('./sqlite3.db', (err) => {
    if(err){
        console.error("Błąd połączenia z bazą danych: ",err.message);
    }
    else{
        console.log("Połączono z bazą");
    }
});

// tworzenie tabel w bazie
db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    );`, (err) => {
        if(err){
            console.error("Błąd tworzenia tabeli: ",err.message);
        }
        else{
            console.log("Utworzono tabele users");
        }
    });

// rejestracja 
app.post('/register', (req, res) => { //req - request, res - resources
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({ message: "Nazwa użytkownika i hasło są wymagane."});
    }
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], (err) =>{
        if(err){
            return res.status(500).json({ message: "Błąd rejestracji użytkownika", error: err.message });
        }    
        res.status(201).json({ message: "Rejestracja pomyślna", userID: this.lastID });
        
    });
});

// logowanie 
app.post('/login', (req, res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({ message: "Nazwa użytkownika i hasło są wymagane."});
    }
    query = `SELECT * FROM users WHERE username = ? and password = ?`;
    db.get(query, [username, password], (err, row) => {
        if(err){
            return res.status(500).json({ message: "Błąd logowania.", error: err.message});
        }
        if(!row){
            return res.status(401).json({ message: "Błędne dane logowania"});
        }
        return res.status(200).json({ message: "Logowanie poprawne", username: row.username});
    });
});

// wypisywanie wszystkich użytkowikow w bazie
app.get('/all', (req, res) => {
    query = `SELECT id, username FROM users ORDER BY id`;
    db.all(query,[] ,(err, rows) => {
        if(err){
            return res.status(500).json({ message: "Błąd ", error: err.message});
        }
        if(!rows){
            return res.status(401).json({ message: "Brak"});
        }
        
        return res.status(200).json({users:rows});
        
    });
})

// start serwera
app.listen(PORT, () => {
    console.log(`Server nasłuchuje na porice ${PORT}`);
});
