// controllers/FuncionarioController.js
import FuncionarioService from '../services/FuncionarioService.js';

class FuncionarioController {
  async getAll(req, res) {
    try {
      const funcionarios = await FuncionarioService.getAllFuncionarios();
      res.status(200).json(funcionarios);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employees', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const funcionario = await FuncionarioService.getFuncionarioById(id);
      if (funcionario) {
        res.status(200).json(funcionario);
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employee', error });
    }
  }

  async create(req, res) {
    try {
      const funcionarioData = req.body;
      const newFuncionario = await FuncionarioService.createFuncionario(funcionarioData);
      res.status(201).json(newFuncionario);
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const funcionarioData = req.body;
      const updatedFuncionario = await FuncionarioService.updateFuncionario(id, funcionarioData);
      res.status(200).json(updatedFuncionario);
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await FuncionarioService.deleteFuncionario(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error });
    }
  }
}

export default new FuncionarioController();
