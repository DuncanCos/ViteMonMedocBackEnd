const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { user } = require('pg/lib/defaults.js');

// Middleware existant
router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

// Nouvelle route de connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await usersController.findUserByUsername(username); // Ajoutez cette méthode dans le controller
        if (!result) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, result.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: result.id, username: result.username,role: result.type }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { type: result.type } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;