USE zoologico;

INSERT INTO categorias (nome) VALUES ('Mamíferos'), ('Aves'), ('Répteis');

INSERT INTO animais (nome, especie, categoria_id, habitat, dieta, descricao, imagem) VALUES
('Leão', 'Panthera leo', 1, 'Savana africana', 'Carnívoro',
 'O rei da savana vive em grupos chamados alcateias.', 'leao.jpg'),
('Elefante', 'Loxodonta africana', 1, 'Savana e florestas', 'Herbívoro',
 'O maior animal terrestre, com memória excelente.', 'elefante.jpg'),
('Flamingo', 'Phoenicopterus roseus', 2, 'Lagos e lagoas', 'Onívoro',
 'Sua cor rosada vem dos pigmentos da alimentação.', 'flamingo.jpg'),
('Jacaré', 'Caiman crocodilus', 3, 'Rios e pântanos', 'Carnívoro',
 'Réptil semiaquático que vive em rios e alagados.', 'jacare.jpg');