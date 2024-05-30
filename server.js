const { Pool } = require('pg');
const config = {
    user: 'postgres',
    password: '1234',
    host: '127.0.0.1',
    port: '5432',
    database: 'always_music',
    max: 20,
    min: 2,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 2000
};

/* ejemplo para entender process.argv -> console.log(process.argv)
process.argv retorna un array con  2 elementos tipo String que reflejan la
dirección del recurso que se está ocupando

otro ejemplo -> 
const argumentos = process.argv.slice(2)
let num1 = Number(argumentos[0])
let num2 = Number(argumentos[1])
console.log(num1 * num2)
node server.js 2 2 
despues de server.js lo siguiente son parametros en la posicion 0 y 1 ya que process retorna un objeto
*/

const pool = new Pool(config)
//module.exports = pool;

const registrarUsuario = async()=>{
    const text = 
    "INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1,$2,$3,$4) RETURNING *";
    const proceso = process.argv.slice(2);
    const values = [proceso[1], proceso[2], proceso[3], proceso[4]];
    const result = await pool.query(text, values);
    console.info('Estudiante ' + proceso[1] + ' registrado con exito');
};//para agregar un usuario ejemplo -> node server.js nuevo 'Frank' '6' 'Java' 'alto'


const consultarRut = async()=>{
    const text = "SELECT * FROM estudiantes WHERE rut =$1";
    const proceso = process.argv.slice(3);
    const values = [proceso[2]];
    const resultado = await pool.query(text, values);
    console.log("Registro actual ", resultado.rows);
};//para consultar utilizar ejemplo -> node server.js rut - 6


const editar = async()=>{
    const text = 
    "UPDATE estudiantes SET (nombre, rut, curso, nivel) = ($1,$2,$3,$4) WHERE id = $5 RETURNING *";
    const proceso = process.argv.slice(2);
    const values = [proceso[1], proceso[2], proceso[3], proceso[4], proceso[5]];
    const result = await pool.query(text, values);
    console.info('Estudiante ' + proceso[1] + ' actualizado con exito');
}// para editar ejemplo -> node server.js editar 'Bianca' '6' 'Angelo' 'medio' '6'
                                                //nombre, rut, curso, nivel, id


const consultarTodo = async()=>{
    const text = 'SELECT * FROM estudiantes';
    const resultado = await pool.query(text);
    console.info(JSON.stringify(resultado.rows, null, 2));
}// ejemplo -> node server.js consulta

const eliminar = async()=>{
    const proceso = process.argv.slice(2);
    const values = [proceso[2]];
    const text = "DELETE FROM estudiantes WHERE rut = $1 RETURNING *";
    const result = await pool.query(text, values);
    console.log("registro de estudiante con rut", result.rows[0].rut, "eliminado")
};//ejemplo elimar por rut node server.js eliminar - '12.222.222-2'


const proceso = process.argv.slice(2);
switch(proceso[0]){
    case 'nuevo': registrarUsuario();
    break;

    case 'editar': editar();
    break;

    case 'consulta': consultarTodo();
    break;

    case 'rut': consultarRut();
    break;

    case 'eliminar': eliminar();
    break;

    default: 
    console.info("no se encontro tu solicitud")
}
