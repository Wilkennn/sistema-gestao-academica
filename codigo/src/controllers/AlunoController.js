import AlunoService from '../services/AlunoService.js';
import UsuarioService from '../services/UsuarioService.js';
import CursoService from '../services/CursoService.js'; // Supondo que você tenha um serviço para cursos

export class AlunoController {
  async getAll(req, res) {
    try {
      const alunos = await AlunoService.getAllAlunos();

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
      
      if (req.query.format === 'json') {
        return res.status(201).json({ message: "Aluno criado com sucesso!", id });;
      } else {
        return res.redirect('/aluno');
      }
      
      res.status(201).json(newAluno);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar aluno', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const alunoData = req.body;
  
      delete alunoData._method;
  
      const { nome, email, ...alunoFields } = alunoData;
      const updatedAluno = await AlunoService.updateAluno(id, alunoFields);
  
      if (nome || email) {
        const usuarioData = { nome, email };
        await UsuarioService.updateUsuario(updatedAluno.usuarioId, usuarioData);
      }
  
      res.redirect('/aluno?success=true&message=Aluno atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      res.status(500).json({
        message: 'Não foi possível atualizar o aluno. Verifique os dados e tente novamente.',
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      console.log(`deleting ${id}`);
      await AlunoService.deleteAluno(id);

      if (req.query.format === 'json') {
        return res.status(201).json({ message: "Aluno deletado com sucesso!", id });;
      } else {
        return res.redirect('/aluno');
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar aluno', error });
    }
  }

  async addCurso(req, res) {
    try {
      const { id } = req.params;
      const { cursoId } = req.body;

      await AlunoService.addCursoAluno(id, cursoId);
      
      res.redirect(`/aluno`);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar curso', error });
    }
  }

  async mostrarCursos(req, res) {
    try {
      const { id } = req.params;
      const aluno = await AlunoService.getAlunoById(id);
      const cursos = await CursoService.getAllCursos();
      
      res.render('adicionarCursoAluno', { aluno, cursos });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao carregar a página', error });
    }
  }
}


