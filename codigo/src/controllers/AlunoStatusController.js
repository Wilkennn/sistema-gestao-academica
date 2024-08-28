// controllers/AlunoStatusController.js
import AlunoStatusService from '../services/AlunoStatusService.js';

export class AlunoStatusController {
  async getAll(req, res) {
    try {
      const alunoStatus = await AlunoStatusService.getAllAlunoStatus();
      res.status(200).json(alunoStatus);
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível buscar a lista de status de alunos. Por favor, tente novamente mais tarde.',
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const alunoStatus = await AlunoStatusService.getAlunoStatusById(id);
      if (alunoStatus) {
        res.status(200).json(alunoStatus);
      } else {
        res.status(404).json({ message: `Status de aluno com ID ${id} não encontrado.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível buscar o status do aluno. Por favor, verifique o ID e tente novamente.',
        error: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const alunoStatusData = req.body;
      const newAlunoStatus = await AlunoStatusService.createAlunoStatus(alunoStatusData);
      res.status(201).json({ message: 'Status de aluno criado com sucesso.', alunoStatus: newAlunoStatus });
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível criar o status do aluno. Verifique os dados fornecidos e tente novamente.',
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const alunoStatusData = req.body;
      const updatedAlunoStatus = await AlunoStatusService.updateAlunoStatus(id, alunoStatusData);
      if (updatedAlunoStatus) {
        res.status(200).json({ message: 'Status de aluno atualizado com sucesso.', alunoStatus: updatedAlunoStatus });
      } else {
        res.status(404).json({ message: `Status de aluno com ID ${id} não encontrado para atualização.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível atualizar o status do aluno. Verifique os dados e tente novamente.',
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await AlunoStatusService.deleteAlunoStatus(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: `Status de aluno com ID ${id} não encontrado para exclusão.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível deletar o status do aluno. Verifique o ID e tente novamente.',
        error: error.message,
      });
    }
  }
}
