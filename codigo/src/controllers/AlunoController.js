import AlunoService from '../services/AlunoService.js';

export class AlunoController {
  async getAll(req, res) {
    try {
      const alunos = await AlunoService.getAllAlunos();
      console.log(alunos)
      res.status(200).json(alunos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      
      const aluno = await AlunoService.getAlunoById(id);
      if (aluno) {
        res.status(200).json(aluno);
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student', error });
    }
  }

  async create(req, res) {
    try {
      const alunoData = req.body;
      const newAluno = await AlunoService.createAluno(alunoData);
      res.status(201).json(newAluno);
    } catch (error) {
      res.status(500).json({ message: 'Error creating student', error });
    }
  }

  async update(req, res) {
    try {
      console.log(req.params);
      const { id } = req.params;
      console.log(req.params);
      const alunoData = req.body;
      const updatedAluno = await AlunoService.updateAluno(id);
      res.status(200).json(updatedAluno);
    } catch (error) {
      res.status(500).json({ message: 'Error updating student', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await AlunoService.deleteAluno(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student', error });
    }
  }
}


