const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

const databaseConfig = {
    host: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "appuser",
    password: process.env.DB_PASSWORD || "apppassword",
    database: process.env.DB_NAME || "day22db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

function getDatabasePool() {
    if (!pool) {
        pool = mysql.createPool(databaseConfig);
    }

    return pool;
}

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Day 22 backend API is running successfully.",
        service: "backend",
        environment: process.env.NODE_ENV || "development"
    });
});

app.get("/health", async (req, res) => {
    try {
        const db = getDatabasePool();
        await db.query("SELECT 1");

        res.status(200).json({
            status: "healthy",
            backend: "connected",
            database: "connected"
        });
    } catch (error) {
        res.status(503).json({
            status: "unhealthy",
            backend: "connected",
            database: "disconnected",
            error: error.message
        });
    }
});

app.get("/api/messages", async (req, res) => {
    try {
        const db = getDatabasePool();

        await db.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                message VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const [countRows] = await db.query(
            "SELECT COUNT(*) AS total FROM messages"
        );

        if (countRows[0].total === 0) {
            await db.query(
                "INSERT INTO messages (message) VALUES (?)",
                ["Hello from the MySQL database inside Docker Compose!"]
            );
        }

        const [rows] = await db.query(
            "SELECT id, message, created_at FROM messages ORDER BY id"
        );

        res.status(200).json({
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error("Database query failed:", error.message);

        res.status(500).json({
            error: "Unable to retrieve messages from the database.",
            details: error.message
        });
    }
});

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found."
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend API is running on port ${PORT}.`);
});
