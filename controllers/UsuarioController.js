const Usuario = require('../models/Usuario');

class UsuarioController {

    // Listar todos os usuários
    async index(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.render('usuarios/index', { usuarios });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao buscar usuários');
        }
    }

    // Formulário de criação
    create(req, res) {
        res.render('usuarios/create');
    }

    // Salvar novo usuário - Create
    async store(req, res) {
        try {
            const { nome, email, matricula, senha, perfil } = req.body;
            await Usuario.create({ nome, email, matricula, senha, perfil });
            res.redirect('/usuarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao criar usuário');
        }
    }

    // Formulário de edição - Read
    async edit(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) return res.status(404).send('Usuário não encontrado');
            res.render('usuarios/edit', { usuario });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao buscar usuário para edição');
        }
    }

    // Atualizar usuário - Update
    async update(req, res) {
        try {
            const { nome, email, matricula, senha, perfil } = req.body;
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) return res.status(404).send('Usuário não encontrado');

            const updateData = { nome, email, matricula, perfil };
            if (senha && senha.trim() !== "") {
                updateData.senha = senha;
            }

            await usuario.update(updateData);
            res.redirect('/usuarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao atualizar usuário');
        }
    }

    // Deletar usuário - Delete
    async delete(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) return res.status(404).send('Usuário não encontrado');
            await usuario.destroy();
            res.redirect('/usuarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao deletar usuário');
        }
    }
}

module.exports = new UsuarioController();