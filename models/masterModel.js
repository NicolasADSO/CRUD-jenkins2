import queryBuilder from '../config/queryBuilder.js';

class masterModel{
    constructor( ){
        this.queryBuilder = new queryBuilder();
    }

    async selectAll(table, columns = '*'){
        try {
            return await this.queryBuilder
                .selectAll(table, columns)
                .execute()
        } catch (error) {
            throw error
        }
    }

    async selectByField(table, field, value, columns = '*'){
        try {
            return await this.queryBuilder
                .selectByField(table, field, value, columns)
                .execute()
        } catch (error) {
            throw error
        }
    }

    async  insertData(table, data){
        try {
            return await this.queryBuilder
                .insertData(table, data)
                .execute()
        } catch (error) {
            throw error
        }
    }

    async update(table, updateData, field, value){
        try {
            return await this.queryBuilder
                .update(table, updateData, field, value)
                .execute()
            
        } catch (error) {
            throw error
        }
    }

    async delete(table, field, value){
        try {
            return await this.queryBuilder 
                .delete(table, field, value)
                .execute()
        } catch (error) {
            throw error
        }
    }


    async selectByFieldExcludingId(table, field, value, id, columns = '*'){
        try {
            return await this.queryBuilder
                .selectByFieldExcludingId(table, field, value, id, columns)
                .execute()
        } catch (error) {
            throw error
        }
    }

}

export default masterModel;
