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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});