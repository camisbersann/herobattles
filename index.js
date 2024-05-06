const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT= 4000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'herobattles',
    password: 'ds564',
    port: 7007,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('A rota está funcionado!')
});

app.get('/heroes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM heroes');
        res.json({
            total: result.rowCount,
            heroes: result.rows,
        });
    } catch (error) {
       console.error('Erro ao obter todos os heróis', error); 
       res.status(500).send('Erro ao obter todos os heróis');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});