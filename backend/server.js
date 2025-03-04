const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const USERS_FILE = './users.json';

app.use(cors());
app.use(bodyParser.json());

// Função para ler usuários do arquivo JSON
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8') || '[]');
};

// Função para escrever usuários no arquivo JSON
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
};

// Rota de registro
app.post('/register', (req, res) => {
    const { email, name, lastName, gender, password } = req.body;
    let users = readUsers();

    // Verifica se o email já existe
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: 'Email já cadastrado!' });
    }

    // Adiciona novo usuário
    const newUser = { email, name, lastName, gender, password };
    users.push(newUser);
    writeUsers(users);

    res.json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    // Verifica se o usuário existe
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Verifica se a senha está correta
    if (user.password !== password) {
        return res.status(401).json({ message: 'Senha incorreta!' });
    }

    res.json({ message: 'Login bem-sucedido!' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
