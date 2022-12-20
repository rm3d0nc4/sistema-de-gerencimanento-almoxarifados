# SISTEMA DE ALMOXARIFADOS
Trabalho final da disciplina de Programação Orientada a Objetos com Typescript (2022.2)

O trabalho consiste numa pequena aplicação capaz de gerenciar o estoque de itens de um almoxarifado,
que contempla os principais conceitos de Programação Orientada a Objetos ([Typescript](https://www.typescriptlang.org/)) e SQL (SQLite)

### Entidades
- Warehouse: representa um almoxarifado, que armazena vários lotes de itens;
- Item: um produto, que possui um nome (Sabão, café, mesa, etc.)
- WarehouseItem: Um lote de um item especifico. possui uma quantidade X, data de inserção e está ligado a um almoxarifado.
- Perishable: Possiu as mesmas características do WarehouseItem. Também possui um prazo de validade, que a partir dele, podemos recusar a 
sua inserção no almoxarifado. Temos aqui uma representação do conceito de **herança**

### Banco de dados
Como mecanismo de persistência de dados, foi utilizado um banco de dados relacional, especificamente, o [**SQLite**](https://www.npmjs.com/package/sqlite). 
Essa decisão foi tomada devido a capacidade de o SQLite conseguir operar sem a necessidade de um servidor, fazendo com que a sua configuração seja mais simplificada.

### Funcionalidades
A aplicação possui também uma interface construída em linha de comando, com todas as funcionalidades, onde o usuário pede interagir com a aplicação, 
inserindo, consultando, editando e removendo informações referentes aos almoxarifados, itens e lotes.
