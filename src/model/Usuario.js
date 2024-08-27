export class Usuario {
    constructor(id, nome, cpf, email, endereco, telefone, data_nascimento, login, senha, alunoMatricula) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.endereco = endereco;
        this.telefone = telefone;
        this.data_nascimento = data_nascimento;
        this.login = login;
        this.senha = senha;
        this.alunoMatricula = alunoMatricula;
    }
}
