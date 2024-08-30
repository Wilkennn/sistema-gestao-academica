import CursoAlunoService from '../services/CursoAlunoService.js';

export class CursoAlunoController {
  async getAll(req, res) {
    try {
      const cursoAlunos = await CursoAlunoService.getAllCursoAlunos();
      res.status(200).json(cursoAlunos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching curso alunos', error });
    }
  }

  async getById(req, res) {
    try {
      const { cursoId, alunoId } = req.params;
      console.log(cursoId, alunoId);
      console.log('Para,etro '+req.params.alunoId);
      const cursoAluno = await CursoAlunoService.getCursoAlunoById(parseInt(cursoId), parseInt(alunoId));
      if (cursoAluno) {
        res.status(200).json(cursoAluno);
      } else {
        res.status(404).json({ message: 'Curso aluno not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching curso aluno', error });
    }
  }

  async create(req, res) {
    try {
      const cursoAlunoData = req.body;
      const newCursoAluno = await CursoAlunoService.createCursoAluno(cursoAlunoData);
      res.status(201).json(newCursoAluno);
    } catch (error) {
      res.status(500).json({ message: 'Error creating curso aluno', error });
    }
  }

  async update(req, res) {
    try {
      const { cursoId, alunoId } = req.params;
      const cursoAlunoData = req.body;
      const updatedCursoAluno = await CursoAlunoService.updateCursoAluno(parseInt(cursoId), parseInt(alunoId), cursoAlunoData);
      if (updatedCursoAluno) {
        res.status(200).json({ message: 'Curso aluno updated successfully', cursoAluno: updatedCursoAluno });
      } else {
        res.status(404).json({ message: 'Curso aluno not found for update' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating curso aluno', error });
    }
  }

  async delete(req, res) {
    try {
      const { cursoId, alunoId } = req.params;
      await CursoAlunoService.deleteCursoAluno(parseInt(cursoId), parseInt(alunoId));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting curso aluno', error });
    }
  }
}