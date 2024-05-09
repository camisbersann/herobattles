# Gerenciamento de batalhas entre as Princesas da Disney
<img src= "/src/images/princesas.jpg">

# Introdução
O Projeto de Gerenciamento Batalhas é uma aplicação de backend desenvolvida para oferecer funcionalidades de CRUD (Create, Read, Update, Delete) relacionadas as princesas da disney. Ele permite a criação, atualização, exclusão e recuperação de informações sobre as princesas, bem como funcionalidades adicionais, como batalhas entre princesas e registro de histórico de batalhas.

# Funcionalidades
- Para criar, ler, atualizar e excluir (CRUD) heróis, realizamos operações de banco de dados usando Node.js e Express.js para construir um serviço de backend. Utilizamos o PostgreSQL como banco de dados para armazenar informações sobre os heróis.

- Além disso, implementamos a funcionalidade de batalhas entre heróis, onde podemos registrar batalhas e consultar o histórico de batalhas. Usando as mesmas tecnologias mencionadas anteriormente, criamos endpoints para permitir a realização de batalhas e para consultar o registro de batalhas anteriores.

- Essa abordagem nos permite criar um sistema completo para gerenciar heróis, realizar batalhas entre eles e manter um registro histórico das batalhas, tudo usando tecnologias como Node.js, Express.js e PostgreSQL.

# Guia de Utilização
1. Faça o download do repositório para o seu dispositivo.
2. Utilize o npm install para instalar todas as dependências do projeto.
3. Prepare o banco de dados PostgreSQL, nomeando-o como heroes_db, e execute o script script.sql para criar as tabelas requeridas.
4. Edite o arquivo index.js e ajuste as configurações do banco de dados de acordo com suas necessidades (incluindo usuário, senha, host e porta).
5. Inicie o servidor através do comando npm run dev.
6. Explore as diversas rotas disponíveis de acordo com a documentação fornecida.

# Documentação e teste de rotas
Testando as Rotas no Insomnia:

Para testar cada rota individualmente, siga estas instruções:

*1.Rota para obter todos os heróis*

- *Método: GET*
- URL: http://localhost:4001/heroes

*2.Rota para obter herói pelo nome*

- *Método: GET*
- URL: http://localhost:4001/heroes/P (Inicial do nome)

*3.Rota para criar um herói*

- *Método: POST*
- URL: http://localhost:4001/heroes
- Corpo da Requisição (JSON): { "name": "Nome do Herói", "power": "Poder do Herói", "strenght": "Força do Herói" }

*4.Rota para editar um herói*

  - *Método: PUT*
  - URL: http://localhost:4001/heroes/{id}
  - Corpo da Requisição (JSON): { "name": "Novo Nome do Herói", "power": "Novo Poder do Herói", "strenght": "Nova Força do Herói" }

*5.Rota para deletar um herói*

  - *Método: DELETE*
  - URL: http://localhost:4001/heroes/{id}

*6.Rota para obter histórico de batalhas*

   - *Método: GET*
   - URL: http://localhost:4001/battles

*7.Rota para realizar a batalha*

   - *Método: GET*
   - URL: http://localhost:4001/battles/{hero1_id}/{hero2_id}

*8.Rota para obter batalha pelo nome do herói*

   - *Método: GET*
   - URL: http://localhost:4001/battles/P (Inicial do nome)

*OBS:* 
- A rota para obter histórico de batalhas retornará "-1" para as batalhas que o herói empatou.

