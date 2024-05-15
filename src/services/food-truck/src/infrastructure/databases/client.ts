import { Database } from "./database";
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

export const kyselyClient = {
    instance:  {} as Kysely<Database>,

    getConnection(){
        return this.instance;
    },

    async createConnection(){
        const dialect = new PostgresDialect({
            pool: new Pool({
                database: process.env.DB_NAME,
                host: process.env.DB_URL,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                port: +(process.env.DB_PORT || 5432) ,
                max: 10,
            })
        });
        this.instance = new Kysely<Database>({
            dialect,
        });
    },
    
    async disconnect(){
        this.instance.destroy();
    }


}

