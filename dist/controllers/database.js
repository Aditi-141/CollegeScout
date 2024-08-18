import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'student',
    password: process.env.DB_PASS || '',  // Ensure password is a string
    port: process.env.DB_PORT || 5432,
});

export default pool;  // ES Modules syntax