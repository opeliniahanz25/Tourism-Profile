import { LGUModel } from './models.js';

export const LGUController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await LGUModel.findByEmail(email);
      if (result.rows.length === 0) return res.status(401).json({ message: "User not found" });
      
      const user = result.rows[0];
      if (user.password === password) {
        // Coerce ID to String to eliminate frontend/backend type mismatch issues
        res.json({ message: "Login successful", user: { id: String(user.id), email: user.email } });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } catch (err) {
      console.error("❌ LOGIN ERROR:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  signup: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await LGUModel.createUser(email, password);
      res.json({ message: "User created!", user: result.rows[0] });
    } catch (err) {
      console.error("❌ SIGNUP ERROR:", err.message);
      res.status(500).json({ error: "User already exists or database error" });
    }
  },

  getLguData: async (req, res) => {
    const { userId } = req.params;
    try {
      const [basicInfo, officials, tourism, transport, institutional, safety] = await LGUModel.getAllData(userId);
      
      const mergedInstitutional = {
        ...(institutional.rows[0]?.data || {}),
        crimeIncidents: safety.rows[0]?.crime_incidents || {},
        hazardMatrix: safety.rows[0]?.hazard_matrix || {}
      };

      res.json({
        basicInfo: basicInfo.rows[0] || {},
        officials: officials.rows[0] || {},
        tourismAssets: tourism.rows[0] || {},
        transportation: { list: transport.rows[0]?.list || [] },
        institutional: mergedInstitutional 
      });
    } catch (err) {
      console.error("❌ GET DATA ERROR:", err.message);
      res.status(500).json({ error: "FETCH FAILED", details: err.message });
    }
  },

  saveBasic: async (req, res) => {
    try {
      await LGUModel.saveBasic(req.body);
      res.json({ message: "Basic Info saved!" });
    } catch (err) {
      console.error("❌ SAVE BASIC ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  saveOfficials: async (req, res) => {
    try {
      await LGUModel.saveOfficials(req.body);
      res.json({ message: "Officials saved!" });
    } catch (err) {
      console.error("❌ SAVE OFFICIALS ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  saveTourism: async (req, res) => {
    const { user_id, attractions, tourismMap } = req.body;
    try {
      await LGUModel.saveTourism(user_id, attractions, tourismMap);
      res.json({ message: "Attractions and Map saved!" });
    } catch (err) {
      console.error("❌ SAVE TOURISM ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  saveAccommodations: async (req, res) => {
    const { user_id, accommodations, accommodation_profile } = req.body;
    try {
      const result = await LGUModel.saveAccommodations(user_id, accommodations, accommodation_profile);
      res.json({ message: "Accommodations saved!", data: result.rows[0] });
    } catch (err) {
      console.error("❌ SAVE ACCOMMODATIONS ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  saveTransport: async (req, res) => {
    const { user_id, list } = req.body;
    if (!user_id) return res.status(400).json({ error: "User ID is required" });
    try {
      const result = await LGUModel.saveTransport(user_id, list);
      res.status(200).json({ message: "TRANSPORTATION SAVED SUCCESSFULLY", data: result.rows[0] });
    } catch (err) {
      console.error("❌ SAVE TRANSPORT ERROR:", err.message);
      res.status(500).json({ error: "FAILED TO SAVE TRANSPORT DATA", details: err.message });
    }
  },

  saveInstitutional: async (req, res) => {
    const user_id = req.body.user_id;
    const payload = req.body.data || req.body;

    if (!user_id) return res.status(400).json({ error: "User ID is required" });
    try {
      await LGUModel.saveInstitutional(user_id, payload);
      res.status(200).json({ message: "Institutional data saved successfully" });
    } catch (err) {
      console.error("❌ SAVE INSTITUTIONAL ERROR:", err.message);
      res.status(500).json({ error: "Database Error", details: err.message });
    }
  },

  saveSafety: async (req, res) => {
    const { user_id, crimeIncidents, hazardMatrix } = req.body;
    try {
      await LGUModel.saveSafety(user_id, crimeIncidents, hazardMatrix);
      res.json({ message: "Safety data saved!" });
    } catch (err) {
      console.error("❌ SAVE SAFETY ERROR:", err.message);
      res.status(500).json({ error: "Database Error", details: err.message });
    }
  }
};