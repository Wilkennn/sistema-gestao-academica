// controllers/cursoStatusController.js
import CursoStatusService from '../services/CursoStatusService.js';

export class CursoStatusController {
  async getAll(req, res) {
    try {
      const cursoStatus = await CursoStatusService.getAllCursoStatus();
      res.status(200).json(cursoStatus);
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível buscar a lista de status de cursos. Por favor, tente novamente mais tarde.',
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const cursoStatus = await cursoStatusService.getCursoStatusById(id);
      if (cursoStatus) {
        res.status(200).json(cursoStatus);
      } else {
        res.status(404).json({ message: `Status de curso com ID ${id} não encontrado.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível buscar o status do curso. Por favor, verifique o ID e tente novamente.',
        error: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const cursoStatusData = req.body;
      const newCursoStatus = await CursoStatusService.createCursoStatus(cursoStatusData);
      res.status(201).json({ message: 'Status de curso criado com sucesso.', cursoStatus: newCursoStatus });
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível criar o status do curso. Verifique os dados fornecidos e tente novamente.',
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const cursoStatusData = req.body;
      const updatedCursoStatus = await CursoStatusService.updateCursoStatus(id, cursoStatusData);
      if (updatedCursoStatus) {
        res.status(200).json({ message: 'Status de curso atualizado com sucesso.', cursoStatus: updatedCursoStatus });
      } else {
        res.status(404).json({ message: `Status de curso com ID ${id} não encontrado para atualização.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível atualizar o status do curso. Verifique os dados e tente novamente.',
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await CursoStatusService.deleteCursoStatus(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: `Status de curso com ID ${id} não encontrado para exclusão.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível deletar o status do curso. Verifique o ID e tente novamente.',
        error: error.message,
      });
    }
  }
}
