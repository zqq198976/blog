import mysql from 'mysql'
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'r123456.com',
	database: 'blog'
})
export default db
