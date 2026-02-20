import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

// 1. SIGN UP ROUTE
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *",
            [email, password]
        );
        res.status(201).json({ message: "Account created successfully!", user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "Email already exists or database error." });
    }
});

// 2. LOGIN ROUTE
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND password = $2", 
            [email, password]
        );
        
        if (user.rows.length > 0) {
            res.status(200).json({ 
                message: "Login successful!", 
                user: { id: user.rows[0].id, email: user.rows[0].email } 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password." });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});