/*async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql')
    const connection = await mysql.createConnection("mysql://root:letspipou@localhost:3306/ecommerce")
    global.connection = connection
*/

const mysql = require('mysql')
var pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})


exports.pool = pool