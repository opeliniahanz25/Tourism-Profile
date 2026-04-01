import express from 'express';
import cors from 'cors';
import { LGUController } from './controllers.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/login', LGUController.login);
app.post('/signup', LGUController.signup);

app.get('/api/get-lgu-data/:userId', LGUController.getLguData);
app.post('/api/save-basic-info', LGUController.saveBasic);
app.post('/api/save-officials', LGUController.saveOfficials);
app.post('/api/save-tourism-assets', LGUController.saveTourism);
app.post('/api/save-accommodations', LGUController.saveAccommodations);
app.post('/api/save-transport', LGUController.saveTransport);
app.post('/api/save-institutional', LGUController.saveInstitutional);
app.post('/api/save-safety', LGUController.saveSafety);

app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log(`Server running on http://localhost:3000`);
    console.log("-----------------------------------------");
});