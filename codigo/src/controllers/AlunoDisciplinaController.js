import AlunoDisciplinaService from '../services/AlunoDisciplinaSrevice.js';

export class AlunoDisciplinaController {
  async getAll(req, res) {
    try {
      const alunoDisciplinas = await AlunoDisciplinaService.getAllAlunoDisciplinas();
      res.status(200).json(alunoDisciplinas);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching aluno disciplinas', error });
    }
  }

  async getById(req, res) {
    try {
      const { alunoId, disciplinaId } = req.params;
      const alunoDisciplina = await AlunoDisciplinaService.getAlunoDisciplinaById(parseInt(alunoId), parseInt(disciplinaId));
      if (alunoDisciplina) {
        res.status(200).json(alunoDisciplina);
      } else {
        res.status(404).json({ message: 'Aluno disciplina not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching aluno disciplina', error });
    }
  }

  async create(req, res) {
    try {
      const alunoDisciplinaData = req.body;
      const newAlunoDisciplina = await AlunoDisciplinaService.createAlunoDisciplina(alunoDisciplinaData);
      res.status(201).json(newAlunoDisciplina);
    } catch (error) {
      res.status(500).json({ message: 'Error creating aluno disciplina', error });
    }
  }

  async update(req, res) {
    try {
      const { alunoId, disciplinaId } = req.params;
      const alunoDisciplinaData = req.body;
      const updatedAlunoDisciplina = await AlunoDisciplinaService.updateAlunoDisciplina(parseInt(alunoId), parseInt(disciplinaId), alunoDisciplinaData);
      if (updatedAlunoDisciplina) {
        res.status(200).json({ message: 'Aluno disciplina updated successfully', alunoDisciplina: updatedAlunoDisciplina });
      } else {
        res.status(404).json({ message: 'Aluno disciplina not found for update' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating aluno disciplina', error });
    }
  }

  async delete(req, res) {
    try {
      const { alunoId, disciplinaId } = req.params;
      await AlunoDisciplinaService.deleteAlunoDisciplina(parseInt(alunoId), parseInt(disciplinaId));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting aluno disciplina', error });
    }
  }
}
