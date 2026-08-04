const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');
const { QueryTypes } = require('sequelize');
require('dotenv').config();

const app = express();

// Configuração do Handlebars
app.engine('handlebars', engine({
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));















// --- ROTAS DE SALAS ---
app.get('/salas', async (req, res) => {
    try {
        const salas = await sequelize.query('SELECT * FROM salas', { type: QueryTypes.SELECT });
        res.render('salas', { salas });
    } catch (error) {
        res.status(500).send("Erro ao carregar salas");
    }
});

app.get('/salas/novo', (req, res) => {
    res.render('addsalas');
});

app.post("/salas/add", async (req, res) => {
    const { sala, disponivel, capacidade } = req.body;
    const disp = disponivel === "on" ? 1 : 0;
    try {
        await sequelize.query(
            "INSERT INTO salas (sala, disponivel, capacidade) VALUES (?, ?, ?)",
            { replacements: [sala, disp, capacidade], type: QueryTypes.INSERT }
        );
        res.redirect("/salas");
    } catch (error) {
        res.status(500).send("Erro ao adicionar sala");
    }
});

app.get('/salas/editar/:id', async (req, res) => {
    try {
        const sala = await sequelize.query('SELECT * FROM salas WHERE id_sala = ?', {
            replacements: [req.params.id],
            type: QueryTypes.SELECT
        });
        res.render('editsalas', { sala: sala[0] });
    } catch (error) {
        res.status(500).send("Erro ao carregar sala para edição");
    }
});

app.post('/salas/update/:id', async (req, res) => {
    const { sala, disponivel, capacidade } = req.body;
    const disp = disponivel === "on" ? 1 : 0;
    try {
        await sequelize.query(
            "UPDATE salas SET sala = ?, disponivel = ?, capacidade = ? WHERE id_sala = ?",
            { replacements: [sala, disp, capacidade, req.params.id], type: QueryTypes.UPDATE }
        );
        res.redirect("/salas");
    } catch (error) {
        res.status(500).send("Erro ao atualizar sala");
    }
});

app.get("/salas/deletar/:id", async (req, res) => {
    try {
        await sequelize.query("DELETE FROM salas WHERE id_sala = ?", {
            replacements: [req.params.id],
            type: QueryTypes.DELETE
        });
        res.redirect("/salas");
    } catch (error) {
        res.status(500).send("Erro ao excluir sala");
    }
});









// --- ROTAS DE DISCIPLINAS ---
app.get('/disciplinas', async (req, res) => {
    try {
        const disciplinas = await sequelize.query('SELECT * FROM disciplina', { type: QueryTypes.SELECT });
        res.render('disciplinas', { disciplinas });
    } catch (error) {
        res.status(500).send("Erro ao carregar disciplinas");
    }
});

app.get('/disciplinas/novo', (req, res) => {
    res.render('adddisciplinas');
});

app.post('/disciplinas/add', async (req, res) => {
    const { materia, professor, qtdAulas, faltas } = req.body;
    try {
        await sequelize.query(
            "INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES (?, ?, ?, ?)",
            { replacements: [materia, professor, qtdAulas, faltas || 0], type: QueryTypes.INSERT }
        );
        res.redirect("/disciplinas");
    } catch (error) {
        res.status(500).send("Erro ao adicionar disciplina");
    }
});

app.get('/disciplinas/editar/:id', async (req, res) => {
    try {
        const disciplina = await sequelize.query('SELECT * FROM disciplina WHERE codigo = ?', {
            replacements: [req.params.id],
            type: QueryTypes.SELECT
        });
        res.render('editdisciplinas', { disciplina: disciplina[0] });
    } catch (error) {
        res.status(500).send("Erro ao carregar disciplina para edição");
    }
});

app.post('/disciplinas/update/:id', async (req, res) => {
    const { materia, professor, qtdAulas, faltas } = req.body;
    try {
        await sequelize.query(
            "UPDATE disciplina SET materia = ?, professor = ?, qtdAulas = ?, faltas = ? WHERE codigo = ?",
            { replacements: [materia, professor, qtdAulas, faltas, req.params.id], type: QueryTypes.UPDATE }
        );
        res.redirect("/disciplinas");
    } catch (error) {
        res.status(500).send("Erro ao atualizar disciplina");
    }
});

app.get('/disciplinas/deletar/:id', async (req, res) => {
    try {
        await sequelize.query("DELETE FROM disciplina WHERE codigo = ?", {
            replacements: [req.params.id],
            type: QueryTypes.DELETE
        });
        res.redirect("/disciplinas");
    } catch (error) {
        res.status(500).send("Erro ao excluir disciplina");
    }
});







// --- ROTAS DE HORÁRIOS ---
app.get('/horarios', async (req, res) => {
    try {
        const horarios = await sequelize.query('SELECT * FROM horarios', { type: QueryTypes.SELECT });
        res.render('horarios', { horarios });
    } catch (error) {
        res.status(500).send("Erro ao carregar horários");
    }
});

app.get('/horarios/novo', async (req, res) => {
    try {
        const disciplinas = await sequelize.query('SELECT materia FROM disciplina', { type: QueryTypes.SELECT });
        const salas = await sequelize.query('SELECT sala FROM salas', { type: QueryTypes.SELECT });
        res.render('addhorarios', { disciplinas, salas });
    } catch (error) {
        res.status(500).send("Erro ao carregar dados para novo horário");
    }
});

app.post('/horarios/add', async (req, res) => {
    const { horarios, disciplinas, sala_lab } = req.body;
    try {
        await sequelize.query(
            "INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES (?, ?, ?)",
            { replacements: [horarios, disciplinas, sala_lab], type: QueryTypes.INSERT }
        );
        res.redirect("/horarios");
    } catch (error) {
        res.status(500).send("Erro ao adicionar horário");
    }
});

app.get('/horarios/editar/:id', async (req, res) => {
    try {
        const horario = await sequelize.query('SELECT * FROM horarios WHERE id_horario = ?', {
            replacements: [req.params.id],
            type: QueryTypes.SELECT
        });
        const disciplinas = await sequelize.query('SELECT materia FROM disciplina', { type: QueryTypes.SELECT });
        const salas = await sequelize.query('SELECT sala FROM salas', { type: QueryTypes.SELECT });
        res.render('edithorarios', { horario: horario[0], disciplinas, salas });
    } catch (error) {
        res.status(500).send("Erro ao carregar horário para edição");
    }
});

app.post('/horarios/update/:id', async (req, res) => {
    const { horarios, disciplinas, sala_lab } = req.body;
    try {
        await sequelize.query(
            "UPDATE horarios SET horarios = ?, disciplinas = ?, sala_lab = ? WHERE id_horario = ?",
            { replacements: [horarios, disciplinas, sala_lab, req.params.id], type: QueryTypes.UPDATE }
        );
        res.redirect("/horarios");
    } catch (error) {
        res.status(500).send("Erro ao atualizar horário");
    }
});

app.get('/horarios/deletar/:id', async (req, res) => {
    try {
        await sequelize.query("DELETE FROM horarios WHERE id_horario = ?", {
            replacements: [req.params.id],
            type: QueryTypes.DELETE
        });
        res.redirect("/horarios");
    } catch (error) {
        res.status(500).send("Erro ao excluir horário");
    }
});








// Rota Principal
app.get('/', (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT || 3000;







// Inicialização do Banco
async function initDB() {
    try {
        await sequelize.sync();
        await sequelize.query(`CREATE TABLE IF NOT EXISTS salas (id_sala INTEGER PRIMARY KEY AUTOINCREMENT, sala TEXT NOT NULL UNIQUE, disponivel INTEGER DEFAULT 1, capacidade INTEGER)`);
        await sequelize.query(`CREATE TABLE IF NOT EXISTS disciplina (codigo INTEGER PRIMARY KEY AUTOINCREMENT, materia TEXT UNIQUE NOT NULL, professor TEXT, qtdAulas INTEGER DEFAULT 0, faltas INTEGER DEFAULT 0)`);
        await sequelize.query(`CREATE TABLE IF NOT EXISTS horarios (id_horario INTEGER PRIMARY KEY AUTOINCREMENT, horarios TEXT NOT NULL, disciplinas TEXT, sala_lab TEXT)`);

        const salasCount = await sequelize.query("SELECT COUNT(*) as count FROM salas", { type: QueryTypes.SELECT });
        if (salasCount[0].count === 0) {
            await sequelize.query("INSERT INTO salas (sala, disponivel, capacidade) VALUES ('Lab 3', 1, 11), ('Sala 9', 1, 71)");
            await sequelize.query("INSERT INTO disciplina (materia, professor, qtdAulas, faltas) VALUES ('História', 'Moisa', 60, 0), ('Programação', 'Havana', 60, 0)");
            await sequelize.query("INSERT INTO horarios (horarios, disciplinas, sala_lab) VALUES ('07:00', 'História', 'Sala 9')");
        }
        console.log('Banco de Dados SQLite inicializado.');
        app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
    } catch (error) {
        console.error('Erro ao inicializar o banco:', error);
    }
}

initDB();
