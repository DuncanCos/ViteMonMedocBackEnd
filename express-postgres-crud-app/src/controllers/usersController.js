const { pool } = require('../config/database'); // Ajustez le chemin selon votre structure
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Users" ');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
};

// GET /users/:id - Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM "Users" WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /users - Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { username, password, type } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO "Users" (username, password, type) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, type]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') { // Contrainte unique violée
            res.status(400).json({ error: 'Ce nom d\'utilisateur existe déjà' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// PUT /users/:id - Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, type } = req.body;

        const result = await pool.query(
            'UPDATE "Users" SET username = $1, password = $2, type = $3 WHERE id = $4 RETURNING *',
            [username, password, type, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ error: 'Ce nom d\'utilisateur existe déjà' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// DELETE /users/:id - Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM "Users" WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findUserByUsername = async (username) => {
    try {
        const result = await pool.query('SELECT * FROM "Users" WHERE username = $1', [username]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};