#  Sistema de Gestão Acadêmica

O Sistema de Gestão Acadêmica é uma aplicação desenvolvida para auxiliar na administração de informações acadêmicas em uma universidade. O sistema permite gerenciar currículos, matrículas, notificações e o cadastro de alunos, professores e disciplinas. A aplicação é construída utilizando Node.js, Express, HTML, CSS e MySQL.

## ✨ Funcionalidades

O sistema oferece as seguintes funcionalidades:

* **‍ Gestão de Alunos:** Cadastro, edição e visualização de alunos.
* **‍ Gestão de Professores:** Cadastro e gerenciamento de informações dos professores.
* ** Matrículas:** Controle de matrículas dos alunos em cursos e disciplinas.
* ** Gestão de Disciplinas:** Cadastro e organização das disciplinas oferecidas.
* ** Notificações:** Envio de notificações para alunos e professores.

Consulte [docs/user\_stories.md](docs/user_stories.md) para uma descrição detalhada das funcionalidades e histórias de usuário.

##  Tecnologias Utilizadas

* **Node.js:** Ambiente de execução para JavaScript no servidor.
* **Express:** Framework para construção de APIs e aplicações web.
* **HTML/CSS:** Linguagens de marcação e estilo para a apresentação da web.
* **MySQL:** Sistema de gerenciamento de banco de dados relacional.
* **Prisma:** ORM (Object-Relational Mapping) para interagir com o banco de dados de forma segura e eficiente.

## ⚙️ Configuração do Banco de Dados com Prisma

Para configurar o banco de dados MySQL para o projeto, siga os passos abaixo:

###  Pré-requisitos

* MySQL Server instalado e em execução.
* Node.js e npm instalados.
* Prisma CLI instalada.

###  Passos para Configuração

1.  **Crie o Banco de Dados**

    Abra seu cliente MySQL e execute o seguinte comando para criar um novo banco de dados:

    ```sql
    CREATE DATABASE sistema_gestao_academica;
    ```

2.  **Configure o Prisma**

    No diretório do seu projeto, crie ou edite o arquivo `.env` para definir a URL de conexão com o banco de dados MySQL. Substitua `usuario`, `senha`, `localhost` e `3306` pelos valores apropriados para sua configuração MySQL:

    ```env
    DATABASE_URL="mysql://usuario:senha@localhost:3306/sistema_gestao_academica"
    ```

3.  **Verifique o Arquivo `schema.prisma`**

    Certifique-se de que o arquivo `prisma/schema.prisma` está configurado corretamente. Este arquivo define o esquema do banco de dados e as relações entre as tabelas.

4.  **Crie e Aplique as Migrações**

    Para criar as tabelas e aplicar as migrações no banco de dados, execute o seguinte comando:

    ```bash
    npx prisma migrate dev
    ```

    O comando acima criará um diretório `prisma/migrations` contendo arquivos de migração e aplicará essas migrações ao banco de dados.

5.  **Gerar o Cliente Prisma**

    Após a criação das migrações, gere o cliente Prisma para que você possa interagir com o banco de dados no código:

    ```bash
    npx prisma generate
    ```

6.  **Verifique a Conexão com Prisma Studio**

    Para garantir que o cliente Prisma esteja corretamente configurado e conectado ao banco de dados, você pode usar o Prisma Studio. Execute o seguinte comando para iniciar o Prisma Studio:

    ```bash
    npx prisma studio
    ```

    O Prisma Studio abrirá em seu navegador padrão, fornecendo uma interface gráfica onde você pode visualizar e interagir com os dados do banco de dados.

## ️ Instruções de Instalação

1.  **Clone o Repositório**

    Clone o repositório para sua máquina local:

    ```bash
    git clone [https://github.com/Wilkennn/repo_sis_matriculas.git](https://github.com/Wilkennn/repo_sis_matriculas.git)
    ```

2.  **Navegue até o Diretório do Projeto**

    Entre no diretório do projeto:

    ```bash
    cd repo_sis_matriculas
    cd codigo
    ```

3.  **Instale as Dependências**

    Instale as dependências necessárias para o projeto:

    ```bash
    npm install
    ```

4.  **Configure o Banco de Dados**

    Crie um banco de dados MySQL e importe o esquema do banco de dados fornecido no diretório `.db.md`.

5.  **Inicie a Aplicação**

    Para iniciar a aplicação, execute:

    ```bash
    npm run dev
    ```

6.  **Acesse a Aplicação**

    Abra o navegador e vá para `http://localhost:3000` para visualizar a aplicação em funcionamento.

##  Contribuição

Contribuições são bem-vindas! Para contribuir, siga estas etapas:

1.  Fork o repositório.
2.  Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`).
3.  Faça suas alterações e adicione testes, se possível.
4.  Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
5.  Faça o push para a branch (`git push origin minha-feature`).
6.  Abra um Pull Request.

##  Licença

Este projeto é licenciado sob a Licença MIT.

##  Participantes

Este projeto é desenvolvido e mantido pelos seguintes participantes:

* Arthur Freitas - GitHub
* Thiago Andrade - GitHub
* Wilken Moreira - GitHub

##  Contato

Se você tiver perguntas ou sugestões, sinta-se à vontade para entrar em contato com Wilken Moreira.