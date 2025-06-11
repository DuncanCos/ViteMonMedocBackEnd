const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ajout de cors
const usersRoutes = require('./routes/usersRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Utilisation de cors
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRoutes);
app.use('/api/patients', patientRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});