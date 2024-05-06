CREATE DATABASE herobattles;

\c herobattles;

CREATE TABLE IF NOT EXISTS heroes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    power VARCHAR(100) NOT NULL,
    strenght INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS battles (
    id SERIAL PRIMARY KEY,
    hero1_id INT NOT NULL,
    hero2_id INT NOT NULL,
    winner INT NOT NULL,
    FOREIGN KEY (hero1_id) REFERENCES heroes(id),
    FOREIGN KEY (hero2_id) REFERENCES heroes(id)
);

INSERT INTO heroes (name, power, strenght) VALUES ('Rapunzel', 'Cabelos Longos', 50);
INSERT INTO heroes (name, power, strenght) VALUES ('Branca de Neve', 'Maça Envenenada', 60);
INSERT INTO heroes (name, power, strenght) VALUES ('Elza', 'Controle do Gelo', 75);
INSERT INTO heroes (name, power, strenght) VALUES ('Moana', 'Controle da Água', 75);
INSERT INTO heroes (name, power, strenght) VALUES ('Mulan', 'Arte Maciais', 120);
INSERT INTO heroes (name, power, strenght) VALUES ('Tiana', 'Talento Culinário', 100);
INSERT INTO heroes (name, power, strenght) VALUES ('Merida', 'Arco e Flecha', 450);
INSERT INTO heroes (name, power, strenght) VALUES ('Aurora', 'Manipulação dos Sonhos', 110);
INSERT INTO heroes (name, power, strenght) VALUES ('Jasmine', 'Controle de Elementos', 250);
INSERT INTO heroes (name, power, strenght) VALUES ('Pocahontas', 'Empatia Elemental', 90);
INSERT INTO heroes (name, power, strenght) VALUES ('Ana', 'Cura Emocional', 55);



