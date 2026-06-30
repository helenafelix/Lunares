create table salas (
 id_sala int AUTO_INCREMENT PRIMARY KEY,
sala varchar(20) not null unique key ,
disponivel boolean not null,
capacidade int

);
create table disciplina (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
 materia varchar(20) UNIQUE,
 professor varchar(20),
qtdAulas int not null,
faltas int
 );

create table horarios (
  horarios TIME PRIMARY KEY,

 disciplinas varchar(20),
Foreign Key ( disciplinas ) 
    REFERENCES disciplina (materia),

sala_lab varchar(20),
Foreign Key (sala_lab) 
    REFERENCES salas(sala)

 );



INSERT INTO salas (sala, disponivel, capacidade) VALUES ('lab 3', TRUE, 11);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('sala 9', TRUE, 71);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('lab 2', TRUE, 39);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('sala 5', TRUE, 54);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('lab 5', FALSE, 33);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('sala 6', TRUE, 93);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('lab 12', FALSE, 27);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('lab 13', TRUE, 37);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('sala 12', TRUE, 89);
INSERT INTO salas (sala, disponivel, capacidade) VALUES ('sala 2', FALSE, 89);

INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('História', 'Moisa', 61, 9);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Biologia', 'Gilney', 63, 14);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Química', 'Alyson', 43, 3);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Português', 'Joseane', 72, 3);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Geografia', 'Emmanuele', 54, 3);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Matemática', 'Rogerio', 49, 13);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Programação', 'Havana', 62, 6);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Projeto e Prática', 'Havana', 63, 12);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Banco de Dados', 'Carol', 59, 0);
INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('Artes', 'Adriano', 75, 0);


INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES ('07:00:00', 'Matemática', 'sala 9');
INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES ('07:50:00', 'Português', 'sala 5');
INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES ('08:40:00', 'História', 'sala 6');
INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES ('09:30:00', 'Geografia', 'sala 12');
INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES ('10:20:00', 'Biologia', 'lab 2');
INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES ('11:10:00', 'Química', 'lab 3');
INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES ('13:00:00', 'Programação', 'lab 13');
