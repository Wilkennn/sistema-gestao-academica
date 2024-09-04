# Sistema de Gestão Acadêmica

## Visão Geral

O Sistema de Gestão Acadêmica é uma aplicação desenvolvida para auxiliar na administração de informações acadêmicas em uma universidade. O sistema permite gerenciar currículos, matrículas, notificações e o cadastro de alunos, professores e disciplinas. A aplicação é construída utilizando Node.js, Express, HTML, CSS e MySQL.

## Funcionalidades

O sistema oferece uma série de funcionalidades para atender às necessidades de funcionários da secretaria, alunos e professores. Para uma descrição detalhada das funcionalidades e histórias de usuário, consulte [docs/user_stories.md](docs/user_stories.md).

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de APIs e aplicações web.
- **HTML**: Linguagem de marcação para estruturar o conteúdo da web.
- **CSS**: Linguagem de estilo para a apresentação da web.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **Prisma**: ORM (Object-Relational Mapping) para interagir com o banco de dados de forma segura e eficiente.

## Instruções de Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/Wilkennn/repo_sis_matriculas.git
    ```

2. **Navegue até o diretório do projeto:**

    ```bash
    cd repo_sis_matriculas
    cd codigo
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Configure o banco de dados:**
   - Crie um banco de dados MySQL e importe o esquema do banco de dados fornecido no diretório [.db.md](.db.md).

5. **Inicie a aplicação:**

    ```bash
    npm run dev
    ```

6. **Acesse a aplicação:**
   - Abra o navegador e vá para `http://localhost:3000`.

## Participantes

Este projeto é desenvolvido e mantido pelos seguintes participantes:

- **Arthur Freitas** - [GitHub](https://github.com/ArthurFreitasJardim)
- **Thiago Andrade** - [GitHub](https://github.com/Thiaago79)
- **Wilken Moreira** - [GitHub](https://github.com/Wilkennn)


## Contribuição

Contribuições são bem-vindas! Por favor, siga estas etapas para contribuir:

1. Fork o repositório.
2. Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`).
3. Faça suas alterações e adicione testes, se possível.
4. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
5. Faça o push para a branch (`git push origin minha-feature`).
6. Abra um Pull Request.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).

## Contato

Se você tiver perguntas ou sugestões, sinta-se à vontade para entrar em contato com [Wilken Moreira](mailto:wilken.henrique2513@gmail.com).
