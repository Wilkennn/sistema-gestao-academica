import autoBind from 'auto-bind';
import CargoService from './CargoService.js';
import CargoRepository from './CargoRepository.js';

const cargoRepository = new CargoRepository();
const cargoService = new CargoService(cargoRepository);

export class CargoController {
  constructor() {
    this.cargoService = cargoService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { id, descricao } = request.body;
      const cargo = await this.cargoService.criar({ id, descricao });
      return response.status(201).json({ success: true, message: 'Cargo criado com sucesso', cargo });
    } catch (error) {
      console.error('Erro ao criar cargo:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const cargos = await this.cargoService.listarTodos();
      return response.status(200).json(cargos);
    } catch (error) {
      console.error('Erro ao listar cargos:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const cargo = await this.cargoService.buscarPorId(id);
      if (!cargo) {
        return response.status(404).json({ error: 'Cargo não encontrado' });
      }
      return response.status(200).json(cargo);
    } catch (error) {
      console.error('Erro ao buscar cargo:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { descricao } = request.body;
      const cargoAtualizado = await this.cargoService.atualizar(id, { descricao });
      return response.status(200).json({ success: true, message: 'Cargo atualizado com sucesso', cargoAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar cargo:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await this.cargoService.deletar(id);
      return response.status(200).json({ success: true, message: 'Cargo deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar cargo:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
