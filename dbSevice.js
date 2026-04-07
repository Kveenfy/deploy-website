const mysql = require('mysql2');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err)=> {
    if (err){
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});

class DbService{
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            // console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(name) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (name) VALUES (?);";

                connection.query(query, [name], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });

            // console.log(insertId);
            return {
                id : insertId,
                name : name
            };

        } catch (error) {
            console.log(error);
        }
    }

    async updateNameById(id, name) {
        try {
            await new Promise((resolve, reject) => {
                const query = "UPDATE users SET name = ? WHERE id = ?;";

                connection.query(query, [name, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });

            // console.log(insertId);
            return {
                id : id,
                name : name
            };

        } catch (error) {
            console.log(error);
        }
    }

    async deleteNameById(id, name) {
        try {
            const isDeleted = await new Promise((resolve, reject) => {
                const query = "DELETE FROM users WHERE id = ?;";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows === 1);
                });
            });

            // console.log(insertId);
            return isDeleted;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;