# Conceitos do Nodejs

$ yarn add express
  - trata das rotas da aplicação

$ yarn add nodemon -D
  - reiniciar o servidor automaticamente toda vez que tiver alguma alteração no
  codigo.


```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "src/index.js",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.4"
  }
}
```
  - Podemos colocar o diretorio do arquivo que esta rodando o servidor no "main",
  e no scripts podemos colocar apenas nodemon. O nodemon vai procurar o arquivo "main".

## Métodos HTTP:

GET: Buscar informações do Back-End.

POST: Criar uma informação de Back-End.

PUT / PATCH: Alterar uma informação no Back-End.

O "PUT" você pode usar para alterar muitas informações. E o "PATCH" e quando você vai alterar apenas uma informação.

DELETE: Deletar uma informação no Back-End.

  /projects 
    - "projects" e um recurso que o usuario quer acessar.

## Tipos de parametros:

  - Parâmetros são formas de o criente que esta requisitando, enviar alguma informação.

Query Params: Nós vamos usar principalmente em: Filtros, Paginação...

/projects?title=React&owner=Alexandre

Estou procurando um projeto que tem o titulo(title) React, e(&) que o dono(owner) seja Alexandre. 

Route Params: Identificar recursos (Atualizar/Deletar)

Request Body: Conteúdo na hora de criar ou editar um recurso. O retorno e atraves de JSON.

## Aplicação Funcional:

$ yarn add uuidv4
  - Ele vai ajudar a criar um id unico e universal.

## Middlewares:

  Interceptador de requisições. Ele pode interromper totalmente a requisição ou alterar dados da requisição. Ele vai agir no meio da requisição e mudar os dados antes de chegar uma resposta para o usuario.

  Todas as nossas rotas pode ser consideradas middlewares.

  Quando usar ? Nós vamos usar quando um trecho de codigo seja disparado de forma automatica em uma ou mais rotas