CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Patients" (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    poids DECIMAL(5, 2),
    taille DECIMAL(5, 2),
    traitement_en_cours TEXT,
    medicament TEXT,
    medecin_id INT NOT NULL,
    notes TEXT,
    rdv TIMESTAMP,
    statut VARCHAR(50),
    numero_de_telephone VARCHAR(15),
    mail VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_medecin
        FOREIGN KEY (medecin_id)
        REFERENCES "Users"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Insert des utilisateurs (médecins)
INSERT INTO "Users" (username, password, type)
VALUES 
    ('drhouse', 'hashed_password_1', 'medecin'),
    ('drwilson', 'hashed_password_2', 'medecin'),
    ('drcameron', 'hashed_password_3', 'medecin');

-- Insert des patients
INSERT INTO "Patients" (
    nom, prenom, age, poids, taille, traitement_en_cours, medicament, medecin_id, 
    notes, rdv, statut, numero_de_telephone, mail
) VALUES 
    ('Dupont', 'Jean', 45, 78.5, 1.75, 'Traitement A', 'Doliprane', 1,
     'Patient stable', '2025-06-15 10:00:00', 'en traitement', '0601020304', 'jean.dupont@example.com'),

    ('Martin', 'Claire', 30, 65.0, 1.65, 'Traitement B', 'Ibuprofène', 2,
     'Répond bien au traitement', '2025-06-20 09:30:00', 'en observation', '0605060708', 'claire.martin@example.com'),

    ('Bernard', 'Luc', 55, 85.2, 1.80, NULL, NULL, 1,
     'Patient récemment admis', NULL, 'nouveau', '0611121314', 'luc.bernard@example.com');

