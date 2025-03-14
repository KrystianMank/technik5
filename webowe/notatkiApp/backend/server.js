const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/assets/images', express.static(path.join(__dirname, 'public/assets/images')));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/assets/images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/assets/images/${req.file.filename}` : null;

    db.run(`INSERT INTO notes(title, content, image) VALUES (?, ?, ?)`, [title, content, imageUrl], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ id: this.lastID, imageUrl });
    });
});

app.get('/notes', (req, res) => {
    db.all(`SELECT * FROM notes`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(rows);
    });
});

app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM notes WHERE id=?`, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Usunięto notatkę" });
    });
});

app.put('/notes/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    let imageUrl = req.file ? `/assets/images/${req.file.filename}` : req.body.imageUrl;

    db.run(`UPDATE notes SET title=?, content=?, image=? WHERE id=?`, [title, content, imageUrl, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Notatka zaktualizowana" });
    });
});

app.listen(5000, () => console.log("Serwer działa na http://localhost:5000"));
