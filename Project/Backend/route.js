import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { LGUController } from './controllers.js';
import pool from './db.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve compiled React frontend static files from the build output directory
app.use(express.static(path.join(__dirname, '../dist')));

// Authentication Routes
app.post('/login', LGUController.login);
app.post('/signup', LGUController.signup);

// API Core Feature Endpoints
app.get('/api/get-lgu-data/:userId', LGUController.getLguData);
app.post('/api/save-basic-info', LGUController.saveBasic);
app.post('/api/save-officials', LGUController.saveOfficials);
app.post('/api/save-tourism-assets', LGUController.saveTourism);
app.post('/api/save-accommodations', LGUController.saveAccommodations);
app.post('/api/save-transport', LGUController.saveTransport);
app.post('/api/save-institutional', LGUController.saveInstitutional);
app.post('/api/save-safety', LGUController.saveSafety);

// Catch-All Handler: Serve index.html for React router paths (e.g., /dashboard)
app.get('/:splat*', (req, res, next) => {
  // If the path matches an explicit backend endpoint, let the route logic handle it
  if (req.path.startsWith('/api') || req.path === '/login' || req.path === '/signup') {
    return next();
  }
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Test the database connection engine layer on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ DATABASE CONNECTION FAILED:", err.message);
  } else {
    console.log("-----------------------------------------");
    console.log("✅ DATABASE CONNECTED SUCCESSFULLY!");
    console.log("-----------------------------------------");
    if (release) release();
  }
});

// Launch the Server Environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log(`Server running on port ${PORT}`);
    console.log("-----------------------------------------");
});