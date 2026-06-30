--  Consultas, alterações e exclusões

-- Consultas
select * from usuarios;
-- Se quiser buscar por algua coluna específica
select * from usuarios where <coluna> = 'XXXX'

-- Atualizar
-- Atualizar nome ou perfil pelo id
UPDATE usuarios SET nome = 'Maria Helena' WHERE id = 2;
UPDATE usuarios SET perfil = 'Professor/Docente' WHERE id = 5;

-- Deletar
-- Deletar um usuário específico
DELETE FROM usuarios WHERE id = 8;

-- Deletar usuários sem matrícula
DELETE FROM usuarios WHERE matricula IS NULL;



