# API DE GESTÃO DE ALUNOS

### Índice

- [Descrição](#descricao)
- [Setup](#setup)
- [Documentação](#documentacao)

### Descrição

API-Rest construída em Nest.js que permite a criação, atualização , edição e exclusão de cadastros

#### Tecnologias utilizadas:

- Nest.Js
- PostgresSQL
- Typescript
- Jest
- Docker

### Setup:

Siga os passos abaixo para executar a aplicação.

#### Ambiente de homologação

No ambiente de homologação vamos utilizar o Docker Compose para rodar os container do banco de dados e API-Rest.

Dentro da pasta raiz do repositório execute os seguintes comandos Docker:

```bash

  docker-compose build --no-cache

  docker-compose up -d

```

O serviço ira ficar disponibilizado na localhost:5000.

#### Ambiente de desenvolvimento

Dentro da pasta raiz do repositório execute o seguinte comando Docker para gerar o banco de dados PostgreSQL com todas as configurações(usuários ,tabelas e etc):

```bash
  cd ./sql
  docker build -t student-db-dev .
  docker run -d -p 5432:5432 --name my-student-db-dev student-db-dev

```

Agora execute os seguintes comando para instalar as dependências e iniciar o servidor de teste:

```bash

npm install

npm run start:dev

```

O serviço ira ficar disponibilizado na localhost:5000.

### Documentação:

Todos os endpoints estão disponíveis para consulta dentro do [Swegger](localhost:5000/api) da aplicação

#### Coletar Alunos

Retorno todos os alunos encontrados e realizar pesquisar com base no nome, email e cpf.

##### Request

Método: GET
Endpoint: /students

#### Filtros:

É possivel filtrar o resultado atraves de query params.

- name;
- Cpf;
- email;

##### Response

Code : 200 - Retorna lista de alunos.
Code : 4xx - Bad Request.
Code : 5xx - Falha no servidor.

**Corpo**

```json
{
  "message": "success",
  "data": {
    "length": 2,
    "students": [
      {
        "id": "14831b42-2225-46ca-bd42-b36dbe3934d0",
        "name": "Beatriz Sara Isabel Martins",
        "cpf": "48263924944",
        "email": "beatriz.sara.martins@deskprint.com.br",
        "created_at": "2024-06-03T16:03:53.014Z",
        "updated_at": "2024-06-03T16:03:53.014Z"
      },
      {
        "id": "4af1a92f-4bb6-4dfe-899d-cb69973bab38",
        "name": "Severino Erick Melo",
        "cpf": "78696479343",
        "email": "severinoerickmelo@agenciaph.com",
        "created_at": "2024-06-03T16:03:53.014Z",
        "updated_at": "2024-06-03T16:03:53.014Z"
      }
    ]
  }
}
```

#### Criar Aluno:

Adicionar um novo aluno ao sistema.

##### Request

Método: POST
Endpoint: /students

**Corpo**

```json
{
  "name": "fulano de tal",
  "cpf": "12345678910",
  "email": "fulano.tal@email.net"
}
```

##### Response

Retorna o ID do aluno recém criado.

**Corpo**

```json
{
  "message": "success",
  "data": {
    "id": "53916e2e-b93b-4a20-bf58-7a2efb2867b2"
  }
}
```

#### Editar Aluno

Atualiza o cadastro de um aluno dentro do sitema

##### Request

Método: PUT
Endpoint: /students

**Corpo**

```json
{
  "id": "53916e2e-b93b-4a20-bf58-7a2efb2867b2",
  "name": "fulano de tal",
  "email": "fulano.tal@email.net"
}
```

##### Response

Code : 202 - Usuário criado com sucesso.
Code : 409 - CPF já encontrado dentro do sistema.
Code : 4xx - Bad Request.
Code : 5xx - Falha no servidor.

#### Buscar Aluno

encontra aluno por ID

##### Request

Método: GET
Endpoint: /students/:id

##### Response

Code : 200 - Retorna aluno.
Code : 4xx - Bad Request.
Code : 5xx - Falha no servidor.

**Corpo**

```json
{
  "message": "success",
  "data": {
    "id": "14831b42-2225-46ca-bd42-b36dbe3934d0",
    "name": "Beatriz Sara Isabel Martins",
    "cpf": "48263924944",
    "email": "beatriz.sara.martins@deskprint.com.br",
    "created_at": "2024-06-03T16:03:53.014Z",
    "updated_at": "2024-06-03T16:03:53.014Z"
  }
}
```

#### Deletar Aluno

encontra aluno por ID

##### Request

Método: DELETE
Endpoint: /students/:id

##### Response

Code : 202 - Retorna deletado com sucesso.
Code : 4xx - Bad Request.
Code : 5xx - Falha no servidor.
