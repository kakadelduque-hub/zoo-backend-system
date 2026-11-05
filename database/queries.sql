-- Animais com o nome da categoria (JOIN)
SELECT a.id, a.nome, c.nome AS categoria
FROM animais a JOIN categorias c ON c.id = a.categoria_id
ORDER BY a.nome;

-- Busca por nome (LIKE)
SELECT * FROM animais WHERE nome LIKE '%le%';

-- Quantos animais por categoria (GROUP BY)
SELECT c.nome, COUNT(a.id) AS total
FROM categorias c LEFT JOIN animais a ON a.categoria_id = c.id
GROUP BY c.id, c.nome;

-- Atualizar e excluir
UPDATE animais SET dieta = 'Onívoro' WHERE id = 1;
DELETE FROM animais WHERE id = 4;