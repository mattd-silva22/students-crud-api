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

Dentro da pasta raiz do repositório execute o seguinte comando Docker:

```bash
	docker-compose up -d
```

O serviço ira ficar disponibilizado na localhost:5000.

#### Ambiente de desenvolvimento

Dentro da pasta raiz do repositório execute o seguinte comando Docker para gerar o banco de dados PostgreSQL com todas as configurações(usuários ,tabelas e etc):

```bash
docker run --name student_db_dev -e POSTGRES_USER=postgres -e POSTGRES_DB=students_db -e POSTGRES_PASSWORD=root -v sql\init.sql -d postgres
```

Agora execute os seguintes comando para instalar as dependências e iniciar o servidor de teste:

```bash
npm install
npm run start:dev
```

O serviço ira ficar disponibilizado na localhost:3000.

### Documentação:

#### Criar Aluno:

Adicionar um novo aluno ao sistema.

##### Request

Metodo: GET
Endpoint: /students

Body{
name : (string), obrigatório
cpf : (string), obrigatório, somente números
email : (string), obrigatório
}

##### Response

HTTP: 201
{
"message": "Success",
"data": [
{
"id": "41d7df63-d566-40dc-a36b-1b565ff7f0cf"
}
]
}

#### Editar Aluno

Editar um aluno dentro do sistema.
Método: PUT
Endpoint: /students

Body{

}
