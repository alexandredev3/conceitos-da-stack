const express = require('express');
const { uuid, isUuid } = require('uuidv4');
// O isUuid ele vai verificar se o id e valido ou não.

const app = express();

app.use(express.json());
// O "use" e quando nos queremos adicionar alguma função que sera passado para todas as rotas.

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  // method: Get, Post, Put...
  // url: rota que esta sendo chamado na nossa aplicação.

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  // se não for colocado esse next, as nossa proximas rotas não serão chamadas.
  next();

  console.timeEnd(logLabel);
  /* ele retorna o tempo que levou entre um log e o outro(os dois console.time
  precisar ter o mesmo parametro). */
};

// Esse middlware vai interromper totalmente a requisição, caso não passe da condição.
function validateProjectId(request, response, next) {
  const { id } = request.params;

  // se não for um id valido ele vai entrar nesse if.
  if (!isUuid(id)) {
    response.status(400).json({ error: 'Invalid project ID.' });
  };

  return next();
};

app.use(logRequests);
app.use('/projects/:id', validateProjectId);
// temos essa outra forma de passa o middlware, indicando o caminho da rota...

// podemos usar um middlware diretamente em uma rota.
app.get('/projects',/* logRequests,*/ (request, response) => {
  // const query = request.query;
  const { title } = request.query;
  // podemos fazer uma desestruturação.

  // console.log(title);
  // console.log(owner);
  // Vai retornar a query que foi colocado la no insomnia.

  const results = title
    ? projects.filter(project => project.title.includes(title))
    /* estou fazendo um filtro(filter) se o project.title inclui(includes) o titulo(title).
      includes retorna true se ele encontrar, e false se ele não encontrar.
    */
    : projects
    // se ele vai retornar nada.

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);
  // O push ele vai jogar essa informação para dentro do array projects.

  // console.log(body);
  // Ele vai retornar aquele body que escrevemos no insomnia.
  // para ele retornar o body precisamos indicar pro express para ele entender JSON.

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  // const params = request.params;
  const { id } = request.params;
  const { title, owner } = request.body;
  // podemos fazer uma desestruturação aqui tambem.

  // console.log(id);
  // Vai retorna o id que foi passado la no insomnia.
  // Ele sabe que e id porque passamos la na rota. /projects/*:id*

  const projectIndex = projects.findIndex(project => project.id === id);
  // estou buscando um projeto que tem o mesmo id que eu passei na rota.
  // findIndex ele vai me retorna a posição do meu array.

  // se ele não encontrou ele vai retorna -1 abaixo que zero.
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project does not exists' });
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;
  // eu estou vendo qual e a posição do projects, e substuindo ele pelo esse novo project.

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project does not exists' });
  };

  projects.splice(projectIndex, 1);
  // splice: para remover
  // "1" e quantas posições eu quero remover.

  return response.status(204).send();
  // quando e uma resposta em branco e recomentavel retorna um status 204(No content).
});

app.listen(3333, () => {
  return console.log('🚀️Server is running...')
});