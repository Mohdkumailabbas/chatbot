import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER, // PostgreSQL username
    password: process.env.DB_PASSWORD, // PostgreSQL password
    host: process.env.DB_HOST, // Database server hostname (e.g., localhost)
    port: process.env.DB_PORT, // PostgreSQL port (default: 5432)
    database: process.env.DB_NAME, // Database name
});
// Function to test connection (connect and disconnect)
export const testConnection = async () => {
    try {
        const client = await pool.connect(); // Connect to the database
        console.log("Connected to the database successfully!");
        client.release(); // Release the connection back to the pool
    }
    catch (err) {
        console.error("Database connection error:", err.message);
    }
};
export default pool;
//# sourceMappingURL=connection.js.map