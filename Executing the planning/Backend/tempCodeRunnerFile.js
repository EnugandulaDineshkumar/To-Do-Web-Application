const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dinesh@22',
    database: 'todo'
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database successfully");
});

// Get all todos
app.get("/", (req, res) => {
    db.query("SELECT * FROM todoItems;", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// Add a new todo
app.post('/add-item', (req, res) => {
    const { text } = req.body;
    db.query(`INSERT INTO todoItems(itemDescription) VALUES (?)`, [text], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ success: true, id: result.insertId });
    });
});

// Delete a todo
app.delete('/delete-item', (req, res) => {
    const { ID } = req.body;
    db.query(`DELETE FROM todoItems WHERE ID = ?`, [ID], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ success: true });
    });
});

// Edit a todo
app.put('/edit-item', (req, res) => {
    const { ID, itemDescription } = req.body;
    db.query(`UPDATE todoItems SET itemDescription = ? WHERE ID = ?`, [itemDescription, ID], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ success: true });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
