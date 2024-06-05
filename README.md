## Always Music descripcion
**Esta aplicación ofrece una forma simple de administrar una lista de estudiantes utilizando una base de datos PostgreSQL, todo desde la línea de comandos.**

**1. Conexión a la Base de Datos:** La aplicación se conecta a una base de datos PostgreSQL utilizando la biblioteca pg de Node.js.

**2. Operaciones CRUD** 
+ Crear: Agregar un nuevo estudiante con nombre, rut, curso y nivel.
+ Leer: Consultar todos los estudiantes o buscar uno por su rut.
+ Actualizar: Modificar la información de un estudiante por su id, cambiando nombre, rut, curso o nivel.
+ Eliminar: Eliminar un estudiante por su rut.

**3. Interfaz de Línea de Comandos (CLI):** La aplicación se ejecuta desde la línea de comandos y acepta diferentes comandos y argumentos para realizar las operaciones mencionadas anteriormente.

**4. Manejo de Errores:** La aplicación maneja errores de conexión a la base de datos, consultas fallidas y otros posibles errores, mostrando mensajes de error claros en la consola.


## Base de datos
```sql
    CREATE DATABASE always_music;
    \c always_music

    CREATE TABLE estudiantes (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100),
      rut VARCHAR(10) UNIQUE,
      curso VARCHAR(50),
      nivel VARCHAR(50)
    );
```

## Ejecutar
```
npm install
node server.js consulta
node server.js nuevo 'Frank' '12.222.222-2' 'Java' 'Principiante'
node server.js rut - '12.222.222-2'
node server.js editar 'Luis' '10.000.000-2' 'Bootstrap' 'medio' '1'
                        nombre, rut,         curso,     nivel, id
node server.js eliminar - '12.222.222-2'
```
## Permite:
Consultar, crear, consultar por rut, editar y eliminar
