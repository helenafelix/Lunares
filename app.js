const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        eq: (a, b) => a === b
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
    res.redirect('/usuarios');
});

// Fiz o const PORT porque foi a única forma que eu consegui de acessar os coisos em banco de dados. De qualquer forma, usar apenas o app.listen(3000, () => { console.log('Servidor rodando em http://localhost:3000 ); }); fazia sincronizar com o banco de dados, mas não aparecia as tabelas

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });
