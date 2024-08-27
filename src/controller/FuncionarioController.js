import autoBind from 'auto-bind';
import FuncionarioService from './FuncionarioService.js';
import FuncionarioRepository from './FuncionarioRepository.js';

const funcionarioRepository = new FuncionarioRepository();
const funcionarioService = new FuncionarioService(funcionarioRepository);

export class FuncionarioController {
  constructor() {
    this.funcionarioService = funcionarioService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { id, nome, cpf, telefone, Cargo_id } = request.body;
      const funcionario = await this.funcionarioService.criar({ id, nome, cpf, telefone, Cargo_id });
      return response.status(201).json({ success: true, message: 'Funcionário criado com sucesso', funcionario });
    } catch (error) {
      console.error('Erro ao criar funcionário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const funcionarios = await this.funcionarioService.listarTodos();
      return response.status(200).json(funcionarios);
    } catch (error) {
      console.error('Erro ao listar funcionários:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const funcionario = await this.funcionarioService.buscarPorId(id);
      if (!funcionario) {
        return response.status(404).json({ error: 'Funcionário não encontrado' });
      }
      return response.status(200).json(funcionario);
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { nome, cpf, telefone, Cargo_id } = request.body;
      const funcionarioAtualizado = await this.funcionarioService.atualizar(id, { nome, cpf, telefone, Cargo_id });
      return response.status(200).json({ success: true, message: 'Funcionário atualizado com sucesso', funcionarioAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await this.funcionarioService.deletar(id);
      return response.status(200).json({ success: true, message: 'Funcionário deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
