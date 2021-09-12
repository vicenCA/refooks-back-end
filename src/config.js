import { config } from 'dotenv' 
config();


export default{
    port: process.env.PORT || 3001,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbServer: process.env.DB_SERVER || '',
    dbDataBase: process.env.DB_DATABASE || '',
    dbPort: parseInt(process.env.DB_PORT, 10)
}

/* npx kill-port 3000 */
