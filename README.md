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
