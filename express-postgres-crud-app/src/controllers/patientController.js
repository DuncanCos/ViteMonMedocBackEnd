const { pool } = require('../config/database'); // Ajustez le chemin selon votre structure
const jwt = require('jsonwebtoken');

exports.getAllPatient = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Patients"');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: error.message });
    }
};

// GET /patients/:id - Récupérer un patient par ID
exports.getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM "Patients" WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Patient non trouvé' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /patients - Créer un nouveau patient
exports.createPatient = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const {
            lastName,
            firstName,
            age,
            weight,
            height,
            phone,
            email,
            processingInProgress,
            medicine,
            appointment,
            status,
            note,
            doctorId,
        } = req.body;

        const nom = lastName;
        const prenom = firstName;
        const poids = weight;
        const taille = height;
        const numero_de_telephone = phone;
        const mail = email;
        const traitement_en_cours = processingInProgress;
        const medicament = medicine;
        const notes = note;
        const medecin = doctorId;
        const rdv = appointment;
        const statut = status;

        const result = await pool.query(
            `INSERT INTO "Patients" 
            (nom, prenom, age, poids, taille, traitement_en_cours, medicament, medecin_id, notes, rdv, statut, numero_de_telephone, mail) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            [nom, prenom, age, poids, taille, traitement_en_cours, medicament, medecin, notes, rdv, statut, numero_de_telephone, mail]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT /patients/:id - Mettre à jour un patient
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nom,
            prenom,
            age,
            poids,
            taille,
            traitement_en_cours,
            medicament,
            medecin_id,
            notes,
            rdv,
            statut,
            numero_de_telephone,
            mail,
          } = req.body;

        const result = await pool.query(
            `UPDATE "Patients" 
            SET nom = $1, prenom = $2, age = $3, poids = $4, taille = $5, traitement_en_cours = $6, medicament = $7, medecin_id = $8, notes = $9, rdv = $10, statut = $11, numero_de_telephone = $12 , mail = $13
            WHERE id = $14 RETURNING *`,
            [nom, prenom, age, poids, taille, traitement_en_cours, medicament, medecin_id, notes, rdv, statut, numero_de_telephone,  mail,id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Patient non trouvé' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE /patients/:id - Supprimer un patient
exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM "Patients" WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Patient non trouvé' });
        }

        res.json({ message: 'Patient supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPatientFromMedecin = async (req, res) => {

    // Récupérer l'ID du médecin depuis le jwt toker authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        console.log('Received token:', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

    } catch (error) {
        res.status(403).json({ message: 'Invalid token.', error: error.message });
    }
    console.log('Decoded user:', req.user.id);


    try {
        const result = await pool.query('SELECT * FROM "Patients" WHERE medecin_id = $1', [req.user.id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: error.message });
    }
};