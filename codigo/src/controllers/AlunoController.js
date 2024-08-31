import AlunoService from '../services/AlunoService.js';

export class AlunoController {
  async getAll(req, res) {
    try {
      const alunos = await AlunoService.getAllAlunos();
      console.log(alunos)

      if (req.query.format === 'json') {
        return res.status(200).json(alunos);
      }else if (req.query.page === 'deletar') {
       return res.render('alunos', { alunos }); 
      }else {
        return res.render('alunos', { alunos });
      }

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

      if (req.query.format === 'json') {
        return res.status(200).json(aluno);
      }else if (req.query.page === 'editar') {
        return res.render('editar', { aluno });
      }else {
        return res.render('perfil', { aluno });
      }

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
      const { id } = req.params;
      const alunoData = req.body;
      const updatedAluno = await AlunoService.updateAluno(id, alunoData);

      if (req.query.format === 'json') {
        return res.status(200).json(cursos);
      } else {
        return res.redirect('/alunos?success=true&message=Aluno atualizado com sucesso.');
      }

      if (updatedAluno) {
        res.status(200).json({ message: 'Aluno atualizado com sucesso.', usuario: updatedAluno });
      } else {
        res.status(404).json({ message: `Aluno com ID ${id} não encontrado para atualização.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível atualizar o aluno. Verifique os dados e tente novamente.',
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await AlunoService.deleteAluno(id);

      if (req.query.format === 'json') {
        return res.status(201).json({ message: "Aluno deletado com sucesso!", id });;
      } else {
        return res.render('aluno', { alunos });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student', error });
    }
  }
}


