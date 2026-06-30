const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/', UsuarioController.index);
router.get('/novo', UsuarioController.create);
router.post('/salvar', UsuarioController.store);
router.get('/editar/:id', UsuarioController.edit);
router.post('/atualizar/:id', UsuarioController.update);
router.get('/deletar/:id', UsuarioController.delete);

module.exports = router;