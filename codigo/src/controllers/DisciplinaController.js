import DisciplinaService from '../services/DisciplinaService.js';
import FuncionarioService from '../services/FuncionarioService.js';

export class DisciplinaController {

  async getAll(req, res) {
    try {
      const disciplinas = await DisciplinaService.getAllDisciplinas();

      if (req.query.format === 'json') {
        return res.status(200).json(disciplinas);
      }else {
        return res.render('disciplinas', { disciplinas });
      }

      res.status(200).json(disciplinas);
    } catch (error) {
      console.error('Erro ao listar disciplinas:', error);
      res.status(500).json({ message: 'Erro ao listar disciplinas', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const disciplina = await DisciplinaService.getDisciplinaById(id);
      const professores = await FuncionarioService.getAllProfessores();


      if (req.query.format === 'json') {
        return res.status(200).json(disciplina, professores);
      }else {
        return res.render('editar-disciplina', { disciplina, professores });
      }

    } catch (error) {
      console.error('Erro ao buscar disciplina:', error);
      res.status(500).json({ message: 'Erro ao buscar disciplina', error });
    }
  }

  async create(req, res) {
    try {
      const disciplinaData = req.body;
      const newDisciplina = await DisciplinaService.createDisciplina(disciplinaData);
      if (req.query.format === 'json') {
        return res.status(201).json({ message: "Disciplina criada com sucesso!", newDisciplina });;
      } else {
        return res.redirect('/disciplina');
      }
    } catch (error) {
      console.error('Erro ao criar disciplina:', error);
      res.status(500).json({ message: 'Erro ao criar disciplina', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const disciplinaData = req.body;
      const updatedDisciplina = await DisciplinaService.updateDisciplina(id, disciplinaData);

      if (req.query.format === 'json') {
        return res.status(201).json({ message: "Disciplina alterada com sucesso!", id });;
      } else {
        return res.redirect('/disciplina');
      }
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error);
      res.status(500).json({ message: 'Erro ao atualizar disciplina', error });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedDisciplina = await DisciplinaService.deleteDisciplina(id);

      if (deletedDisciplina) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: `Disciplina com ID ${id} não encontrada.` });
      }
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error);
      res.status(500).json({ message: 'Erro ao excluir disciplina', error });
    }
  }
}

