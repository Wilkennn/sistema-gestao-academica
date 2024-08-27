import autoBind from 'auto-bind';
import UsuarioService from '../service/UsuarioService.js';
import UsuarioRepository from '../repository/UsuarioRepository.js';

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {
  constructor() {
    this.usuarioService = usuarioService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { nome, cpf, email, endereco, telefone, data_nascimento, login, senha, alunoMatricula } = request.body;

      if (!nome || !cpf || !email || !endereco || !telefone || !data_nascimento || !login || !senha) {
        return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const usuario = await this.usuarioService.criar({ nome, cpf, email, endereco, telefone, data_nascimento, login, senha, alunoMatricula });
      return response.status(201).json({ success: true, message: 'Usuário criado com sucesso', usuario });
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const usuarios = await this.usuarioService.listarTodos();
  
      if (usuarios.length === 0) {
        return response.status(404).json({ message: 'Nenhum usuário encontrado' });
      }
  
      return response.status(200).json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const usuario = await this.usuarioService.buscarPorId(id);

      if (!usuario) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      return response.status(200).json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { nome, cpf, email, endereco, telefone, data_nascimento, login, senha, alunoMatricula } = request.body;

      if (!nome || !cpf || !email || !endereco || !telefone || !data_nascimento || !login || !senha) {
        return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const usuarioAtualizado = await this.usuarioService.atualizar(id, { nome, cpf, email, endereco, telefone, data_nascimento, login, senha, alunoMatricula });

      if (!usuarioAtualizado) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      return response.status(200).json({ success: true, message: 'Usuário atualizado com sucesso', usuarioAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const usuarioDeletado = await this.usuarioService.deletar(id);

      if (!usuarioDeletado) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      return response.status(200).json({ success: true, message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
