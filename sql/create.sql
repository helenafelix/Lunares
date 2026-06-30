create schema usuariopp2;
use usuariopp2;

create table usuarios (
	id integer primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) unique key not null,
    matricula varchar(30) unique key,
    senha varchar(20) not null,
    perfil enum('Admin/Gestão', 'Professor/Docente', 'Aluno/Discente') not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);