// app.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Cambia a tu contraseña
  database: 'todo_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Crear tarea
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const sql = 'INSERT INTO tasks (title, description, status, created_at) VALUES (?, ?, false, NOW())';
  db.query(sql, [title, description], (err, result) => {
    if (err) throw err;
    res.send('Tarea creada con éxito');
  });
});

// Listar tareas
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Actualizar tarea
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
  db.query(sql, [title, description, status, id], (err, result) => {
    if (err) throw err;
    res.send('Tarea actualizada con éxito');
  });
});

// Eliminar tarea
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Tarea eliminada con éxito');
  });
});

app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
