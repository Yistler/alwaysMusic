const chalk = require('chalk');
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
const pool = new Pool(config)

//funcion para conectar a postgres y crear una instancia de client
const conectar = async()=>{
    let client;
    try{
        client = await pool.connect();
        return client;
    }catch(err){
        const { code } = err;
        console.error("Error al conectarse al servidor:", err);
        console.error("Codigo Error:", code);
    }finally{
        pool.end();
    }
}

//registar usuario llama a conectar quien retorna(client) una instancia de la conexion
const registrarUsuario = async()=>{
    const client = await conectar();
    try{
        const proceso = process.argv.slice(2);
        const consulta = {
            text: "INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1,$2,$3,$4) RETURNING *",
            values: [proceso[1], proceso[2], proceso[3], proceso[4]],
            rowMode: "array"
        }
        const result = await client.query(consulta);
        console.info('Estudiante ' + proceso[1] + ' registrado con exito');
        console.info(result.rows);
    }catch(err){
        const { code } = err;
        console.error('Error al registrar estudiante: ', err);
        console.error('Codigo de error ', code);
    }finally{
        client.release();
    }
}
//para agregar un usuario ejemplo -> node server.js nuevo 'Frank' '6' 'Java' 'alto'

//consultar usuario por rut llama a conectar quien retorna(client) una instancia de la conexion
const consultarRut = async()=>{
    const client = await conectar();
    try{
        const proceso = process.argv.slice(2);
        const consulta = {
            text: "SELECT * FROM estudiantes WHERE rut =$1",
            values: [proceso[2]],
            rowMode: "array"
        }
        const resultado = await client.query(consulta);
        console.log("Registro actual ", resultado.rows);
    }catch(err){
        const { code } = err;
        console.error("Al consultar rut Error:", err);
        console.error("codigo de Error:", code);
    }finally{
        client.release();
    }
};//para consultar utilizar ejemplo -> node server.js rut - 6


const editar = async()=>{
    const client = await conectar();
    try{
        const proceso = process.argv.slice(2);
        const consulta = {
            text: "UPDATE estudiantes SET (nombre, rut, curso, nivel) = ($1,$2,$3,$4) WHERE id = $5 RETURNING *",
            values: [proceso[1], proceso[2], proceso[3], proceso[4], proceso[5]],
            rowMode: "array"
        };
        const resultado = await client.query(consulta);
        console.info('Estudiante ' + proceso[1] + ' actualizado con exito');
        console.info('-----------------------------------------------------');
        console.info(resultado.rows);
    }catch(err){
        const { code } = err;
        console.error("Error al actualizar:", err);
        console.error("Codigo de error:", code);
    }finally{
        client.release();
    }
};// para editar ejemplo -> node server.js editar 'Luis' '6' 'Bootstrap' 'medio' '1'
                                                //nombre, rut, curso, nivel, id


const consultarTodo = async()=>{
    const client = await conectar();
    try{
        const consulta = {
            text: 'SELECT * FROM estudiantes',
            rowMode: "array"
        }
        const resultado = await client.query(consulta);
        console.info(JSON.stringify(resultado.rows, null, 2));
    }catch(err){
        const { code } = err;
        console.error("Error al consultar:", err);
        console.error("Codigo de error:", code);
    }finally{
        client.release();
    }
}// ejemplo -> node server.js consulta

const eliminar = async()=>{
    const client = await conectar();
    try{
        const proceso = process.argv.slice(2);
        const consulta = {
            text: "DELETE FROM estudiantes WHERE rut = $1 RETURNING *",
            values: [proceso[2]],
            rowMode: "array"
        }
        const result = await client.query(consulta);
        console.log("registro de estudiante con rut", proceso[2], "eliminado")
    }catch(err){
        const { code } = err;
        console.error("Error al consultar:", err);
        console.error("Codigo de error:", code);
    }finally{
        client.release();
    }
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
    console.log(chalk.bgRed("Error de solicitud:"));
    console.info(chalk.bgGreen("Solicitud: Para agregar"));
    console.info(chalk.bgWhite("node server.js nuevo 'Antonio' '12.222.222-2' 'JavaScript' 'Alto'"));
    console.log("----------------------------------------------------------------------------");
    console.info(chalk.bgGreen("Solicitud: Para consultar por rut"));
    console.info(chalk.bgWhite("node server.js rut - '12.222.222-2'"));
    console.log("-----------------------------------------------------------------------------");
    console.info(chalk.bgGreen("Solicitud: Para editar"));
    console.info(chalk.bgWhite("node server.js editar 'Luis' '14.444.444-4' 'Bootstrap' 'medio' 'id'"));
    console.log("-----------------------------------------------------------------------------");
    console.info(chalk.bgGreen("Solicitud para consultar todo"));
    console.info(chalk.bgWhite("node server.js consulta"));
    console.log("-----------------------------------------------------------------------------");
    console.info(chalk.bgGreen("Solicitud para eliminar por rut"));
    console.info(chalk.bgWhite("node server.js eliminar - '12.222.222-2'"));
}
