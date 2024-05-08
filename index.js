const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 4001;

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

app.get('/battles', async (req, res) => {
    try {
        const result = await pool.query(`SELECT battles.id AS numero_batalha, 
        battles.hero1_id AS id_heroi1, 
        battles.hero2_id AS id_heroi2, 
        battles.winner AS vencedor, 
        heroes.name, 
        heroes.power, 
        heroes.strenght 
        FROM battles 
        JOIN heroes ON battles.winner = heroes.id`);
        res.json({
            total: result.rowCount,
            battles: result.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todas as batalhas', error);
        res.status(500).send('Erro ao obter todas as batalhas');
    }
});

app.get('/battles/:hero1_id/:hero2_id', async (req, res) => {
    try {
        const { hero1_id, hero2_id } = req.params;

        // Obter dados dos heróis
        const result1 = await pool.query('SELECT * FROM heroes WHERE id = $1', [hero1_id]);
        const result2 = await pool.query('SELECT * FROM heroes WHERE id = $1', [hero2_id]);

        const h1 = result1.rows[0];
        const h2 = result2.rows[0];

        let winner = -1;

        if (h1.strenght > h2.strenght) {
            winner = h1.id;
        } else if (h2.strenght > h1.strenght) {
            winner = h2.id;
        }

        // Inserir dados da batalha na tabela de batalhas
        const battleInsertQuery = 'INSERT INTO battles (hero1_id, hero2_id, winner) VALUES ($1, $2, $3) RETURNING id';
        const battleResult = await pool.query(battleInsertQuery, [hero1_id, hero2_id, winner]);

        let winnerInfo;
        if (winner != -1) {
            const winnerResult = await pool.query('SELECT * FROM heroes WHERE id = $1', [winner]);
            winnerInfo = winnerResult.rows[0];
        }

        res.json({ winner: winner == -1 ? 'Empate' : winner, battle_id: battleResult.rows[0].id });
    } catch (error) {
        console.error('Erro ao batalhar', error);
        res.status(500).json({ message: 'Erro ao batalhar' });
    }
});

app.get('/heroes/:filter', async (req, res) => {
    try {
        const { filter } = req.params;

        if (isNaN(req.params.filter)) {
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

app.get('/battles/:filter', async (req, res) => {
    try {
        const { filter } = req.params;

        if (isNaN(req.params.filter)) {
            const result = await pool.query(`SELECT 
            heroes.id,
            heroes.name,
            heroes.power,
            heroes.strenght,
            COUNT(battles.id) AS total_batalhas
        FROM 
            heroes
        LEFT JOIN 
            battles ON heroes.id = battles.hero1_id OR heroes.id = battles.hero2_id
        WHERE 
            heroes.name LIKE $1
            GROUP BY 
    heroes.id, heroes.name, heroes.power, heroes.strenght`, [`%${filter}%`]);
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
    } catch (error) {
        console.error('Erro ao criar herói', error);
        res.status(500).json({ message: 'Erro ao criar herói' });
    }
});

app.put('/heroes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, power, strenght } = req.body;

        await pool.query('UPDATE heroes SET name = $1, power = $2, strenght = $3 WHERE id = $4', [name, power, strenght, id]);
        res.status(201).send({ mensagem: 'Herói atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar herói', error);
        res.status(500).send('Erro ao atualizar herói');
    }
});

app.delete('/heroes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM heroes WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Herói deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar herói', error);
        res.status(500).send('Erro ao deletar herói');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});