import mysql from 'mysql2/promise'


class connection{
    constructor(){
        this.pool = null;
    }

    async connect(){
        if(!this.pool){
            this.pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                port: process.env.DB_PORT,
                waitForConnections: true,
                connectionLimit: process.env.DB_CONNECTION_LIMIT,
                queueLimit: 0
            })
        }


        try {
            const connection = await this.pool.getConnection();
            console.log("Conectado con la base de datos.")
            connection.release()
        } catch (error) {
            console.error('No fue posible conectar con la base de datos')
            throw error
        }
    }


    getPool(){
        if(!this.pool){
            throw new Error("Database connection no establecida llame la funcion connect() primero")
        }

        return this.pool;
    }

    async close(){
        if(this.pool){
            await this.pool.end();
            this.pool = null;
            console.log("Conexion cerrada");
        }
    }
}

export default new connection