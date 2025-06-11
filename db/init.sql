CREATE TABLE IF NOT EXISTS "Patients" (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    poids DECIMAL(5, 2),
    taille DECIMAL(5, 2),
    traitement_en_cours TEXT,
    medicament TEXT,
    medecin VARCHAR(255),
    notes TEXT,
    rdv TIMESTAMP,
    statut VARCHAR(50),
    numero_de_telephone VARCHAR(15),
    last_update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);