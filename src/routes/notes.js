const express = require('express');
const mysql = require('mysql');
//Project's own requires
const pool = require('../config/database');

//Initializations
const router = express.Router();

//Rutas
// Create texts
router.post('/create', async (req, res) => {//Ruta para editar booking
    const { text, title } = req.body
    const result = await pool.query(`INSERT INTO notes (text, title) VALUES ("${text}", "${title}");`)
    res.json(result);
});

// Read all saved texts
router.get('/get_notes', async (req, res) => {
    const result = await pool.query('SELECT * FROM notes');
    res.send(result)
});

// Update some text by id
router.put('/update', async (req, res) => {//Ruta para editar booking
    const { id, text, title } = req.body
    const result = await pool.query(`UPDATE notes SET text = "${text}", title = "${title}"  WHERE id = "${id}"`)
    res.json(result);
});


// delete some text by id
router.delete('/remove/:id', async (req, res) => {
    let { id } = req.params
    const result = await pool.query(`DELETE FROM notes WHERE id = ${id}`);
    res.send("Removed text: " + id)
});


module.exports = router;
