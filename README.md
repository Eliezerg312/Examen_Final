# Examen_Final </br>
Proyecto de examen final Universidad Regional de Guatemala</br>
Curso: PROGRAMACIÓN WEB Y BASES DE DATOS II</br>
CARRERA: ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS</br>
NOMBRE DEL CATEDRÁTICO: Luis Felipe Figueroa Molina</br>
NOMBRE DEL AlUMNO: Ervin Eliezer García Camey</br>
CARNET: 2250162</br>

# To-Do List

Este proyecto es una aplicación de **To-Do List** donde puedes agregar, editar y eliminar tareas. El backend está desarrollado con **Node.js**, **Express** y **MySQL**, y el frontend está construido con **HTML** y **CSS**. Esta aplicación te permite gestionar tareas pendientes de manera fácil y eficiente.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (v14 o superior)
- **MySQL** (o un servidor de bases de datos compatible con MySQL)
- **Git** (para clonar el repositorio)

## Instalación

1. **Clona el repositorio** en tu máquina local:

   git clone https://github.com/tu_usuario/to-do-list.git
   cd to-do-list

## Configuración

1. Clona el repositorio.
2. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=todo_app
    PORT=3000

3. Instala las dependencias:

    npm install

4. Ejecuta el servidor:

    npm start

La aplicación se ejecutará en `http://localhost:3000`.

5. Crear la base de datos:

    Abre MySQL y crea una base de datos llamada to_do_list (o cualquier otro nombre que hayas especificado en las variables de entorno). Luego, ejecuta el siguiente comando SQL para crear la tabla de tareas:

    CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

5. Crear la base de datos:
Después de configurar el archivo .env y crear la base de datos, puedes iniciar el servidor:

npm start

Uso
Interfaz Web:
Una vez que el servidor esté corriendo, abre tu navegador y ve a http://localhost:3000. En la página verás el formulario para agregar nuevas tareas, y debajo una lista con todas las tareas existentes. Puedes:

Agregar nuevas tareas: Escribe un título y descripción, luego presiona "Agregar Tarea".
Editar tareas: Haz clic en "Editar" junto a cualquier tarea, y podrás cambiar su título y descripción.
Eliminar tareas: Haz clic en "Eliminar" junto a cualquier tarea para eliminarla.
API REST:
El backend proporciona las siguientes rutas para interactuar con las tareas:

GET /tasks: Obtener todas las tareas.
POST /tasks: Crear una nueva tarea (requiere un cuerpo JSON con title y description).
PUT /tasks/:id: Editar una tarea existente (requiere un cuerpo JSON con title y description).
DELETE /tasks/:id: Eliminar una tarea por su ID.
