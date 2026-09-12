const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // HTML/CSS/JS ፋይሎችን ለማንበብ

// የ SQLite ዳታቤዝ መፍጠር
const db = new sqlite3.Database('./school.db', (err) => {
    if (err) console.error("Database error:", err.message);
    else console.log("SQLite Database connected!");
});

// የዳታቤዝ ሰንጠረዦች መፍጠር
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        grade TEXT
    )`);
});

// ተማሪ መመዝገቢያ API
app.post('/api/students', (req, res) => {
    const { name, email, grade } = req.body;
    db.run(`INSERT INTO students (name, email, grade) VALUES (?, ?, ?)`, [name, email, grade], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "ተማሪው በጥሩ ሁኔታ ተመዝግቧል!", id: this.lastID });
    });
});

// የተማሪዎች ዝርዝር ማወጫ API
app.get('/api/students', (req, res) => {
    db.all(`SELECT * FROM students`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// ሰርቨሩን ማስነሳት
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
