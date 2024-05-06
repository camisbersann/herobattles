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

app.get('/heroes/:filter', async (req, res) => {
    try {
        const { filter } = req.params;

        if (isNaN(req.params.filter)){
            const result = await pool.query('SELECT * FROM heroes WHERE name LIKE $1', [`%${filter}%`]);
            res.status(200).json(result.rows[0]);
        } else {
            const result = await pool.query('SELECT * FROM heroes WHERE  = $1', [filter]);
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
         console.error('Erro ao obter herói pelo nome', error); 
         res.status(500).send('Erro ao obter herói pelo nome');
    }
 })

 app.post('/heroes', async (req, res) => {
    try {
        const { name, power, strenght } = req.body;

        await pool.query('INSERT INTO heroes (name, power, strenght) VALUES ($1, $2, $3)', [name, power, strenght]);
        res.status(201).send({ mensagem: 'Herói criado com sucesso!' });
    }   catch (error) {
        console.error('Erro ao criar herói', error);
        res.status(500).json({ message: 'Erro ao criar herói' });
    }
});



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});