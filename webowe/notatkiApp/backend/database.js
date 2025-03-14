const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./notes.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE ,(err) => {
    if(err){
        console.log("Problem z połączeniem z bazą danych.", err);
    }
    else{
        console.log("Połączono z bazą");
    }
});

db.run(`CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image TEXT 
    )`);

module.exports = db;