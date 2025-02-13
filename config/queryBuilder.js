import config from "./config.js";


class queryBuilder{
    

    constructor(){
        this.query = '';
        this.values = []; 
    }

    selectAll(table, columns = '*'){
        const selectedColumns = Array.isArray(columns) ? columns.join(', ') : columns;
        this.query = `select ${selectedColumns} from ${table}`;
        this.values = [];
        return this
    }

    selectByField(table, field, value, columns = '*'){
        const selectedColumns = Array.isArray(columns) ? columns.join(', ') : columns;
        this.query = `select ${selectedColumns} from ${table} where ${field} = ?`
        this.values = [value]
        return this
    }

    insertData(table, data){
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        this.query = `insert into ${table} (${columns}) values (${placeholders})`;
        this.values = Object.values(data)
        return this
    }


    update(table, updateData, field, value){
        const setClause = Object.entries(updateData).map(([key]) => `${key} = ?`).join(', ');
        this.query = `update ${table} set ${setClause} where ${field} = ?`;
        this.values = [...Object.values(updateData), value]
        return this
    }

    delete(table, field, value){
        this.query = `delete from ${table} where ${field} = ?`;
        this.values = [value]
        return this;
    }

    selectByFieldExcludingId(table, field, value, id, columns = '*'){
        const selectedColumns = Array.isArray(columns) ? columns.join(', ') : columns;
        this.query = `select ${selectedColumns} from ${table} where ${field} = ? and ${id} != ?`;
        this.values = [value, id]
        return this
    }

    async execute(){
        try {
            await config.connect();
            const pool = config.getPool()
            const [result] = await pool.query(this.query, this.values);
            this.values = []
            return result;
        } catch (error) {
            throw error
        }
    }



}

export default queryBuilder