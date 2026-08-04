-- Script Consolidado do Projeto Lunares

-- 1. Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS lunares;
USE lunares;

-- 2. Tabela de Salas
CREATE TABLE IF NOT EXISTS salas (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    sala VARCHAR(20) NOT NULL UNIQUE,
    disponivel BOOLEAN NOT NULL DEFAULT TRUE,
    capacidade INT
);

-- 3. Tabela de Disciplinas
CREATE TABLE IF NOT EXISTS disciplina (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    materia VARCHAR(50) UNIQUE NOT NULL,
    professor VARCHAR(50),
    qtdAulas INT NOT NULL DEFAULT 0,
    faltas INT DEFAULT 0
);

-- 4. Tabela de Horários
CREATE TABLE IF NOT EXISTS horarios (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    horarios TIME NOT NULL,
    disciplinas VARCHAR(50),
    sala_lab VARCHAR(20),
    FOREIGN KEY (disciplinas) REFERENCES disciplina(materia) ON DELETE SET NULL,
    FOREIGN KEY (sala_lab) REFERENCES salas(sala) ON DELETE SET NULL
);

-- 5. Tabela de Usuários (Sequelize compatível)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    matricula VARCHAR(30) UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('Admin/Gestão', 'Professor/Docente', 'Aluno/Discente') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Dados Iniciais de Exemplo
INSERT INTO salas (sala, disponivel, capacidade) VALUES 
('lab 3', TRUE, 11), ('sala 9', TRUE, 71), ('lab 2', TRUE, 39), ('sala 5', TRUE, 54),
('lab 5', FALSE, 33), ('sala 6', TRUE, 93), ('lab 12', FALSE, 27), ('lab 13', TRUE, 37);

INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES 
('História', 'Moisa', 60, 0), ('Biologia', 'Gilney', 60, 0), ('Química', 'Alyson', 40, 0),
('Português', 'Joseane', 70, 0), ('Matemática', 'Rogerio', 50, 0), ('Programação', 'Havana', 60, 0);

INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES 
('07:00:00', 'Matemática', 'sala 9'), ('07:50:00', 'Português', 'sala 5'),
('08:40:00', 'História', 'sala 6'), ('13:00:00', 'Programação', 'lab 13');

INSERT INTO usuarios (nome, email, matricula, senha, perfil) VALUES 
('Administrador', 'admin@jaboatao.ifpe.edu.br', '0000', 'admin123', 'Admin/Gestão'),
('Helena Felix', 'mhofs@discente.ifpe.edu.br', '20251TDS-JG0269', '123456', 'Aluno/Discente');
