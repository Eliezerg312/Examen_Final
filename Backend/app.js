import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Cargar las variables de entorno
dotenv.config();

// Inicializar la aplicación Express
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta Frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../Frontend')));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware para procesar JSON en las solicitudes
app.use(bodyParser.json());

// Ruta para obtener todas las tareas
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener las tareas');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar una nueva tarea
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
  db.query(query, [title, description], (err, results) => {
    if (err) {
      res.status(500).send('Error al agregar la tarea');
      return;
    }
    res.status(201).send('Tarea agregada con éxito');
  });
});

// PUT endpoint para editar una tarea
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Validamos que los datos sean correctos
  if (!title || !description) {
    return res.status(400).json({ error: 'El título y la descripción son necesarios.' });
  }

  console.log(`Actualizando tarea con ID: ${id}`);
  console.log(`Nuevo título: ${title}`);
  console.log(`Nueva descripción: ${description}`);

  // Actualizamos la tarea en la base de datos
  const query = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
  db.query(query, [title, description, id], (err, result) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: 'Hubo un problema al actualizar la tarea.' });
    }

    if (result.affectedRows === 0) {
      console.log('No se encontró la tarea con ese ID');
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    console.log(`Tarea con ID: ${id} actualizada correctamente.`);
    res.status(200).json({ message: 'Tarea actualizada correctamente.' });
  });
});


// DELETE endpoint para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  // Eliminamos la tarea de la base de datos
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Hubo un problema al eliminar la tarea.' });
    }
    res.status(200).json({ message: 'Tarea eliminada correctamente.' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
