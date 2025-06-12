const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.post('/',  patientController.createPatient);
router.get('/',  patientController.getAllPatient);
router.get('/medecin/',  patientController.getPatientFromMedecin);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
module.exports = router;