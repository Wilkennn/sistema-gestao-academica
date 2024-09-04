import AlunoService from '../services/AlunoService.js';
import UsuarioService from '../services/UsuarioService.js';
import CursoService from '../services/CursoService.js';

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
      }else if (req.originalUrl.includes('/editar-aluno')) {
        return res.render('editar-aluno', { aluno });
      }else if (req.originalUrl.includes('/menu-aluno')) {
        return res.render('menu-aluno', { aluno });
      }else {
        return res.render('perfil', { aluno });
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

        return res.status(201).json({ message: "Aluno criado com sucesso!", id: newAluno.id });
      } else {

        return res.redirect('/aluno-cadastrar?success=true&message= Aluno Cadastrado com sucesso !&messageType=success');
      }
  
    } catch (error) {

      res.status(500).json({ message: 'Erro ao criar aluno', error: error.message });
    }
  }

  async update(req, res) {
    try {

      console.log(req.body)

      const usuarioData = (({ nome, email, cpf, endereco, login, telefone, dataNascimento }) => ({ nome, email, cpf, endereco, login, telefone, dataNascimento }))(req.body);

      const { id } = req.params;

      const aluno = await AlunoService.getAlunoById(id);

      const idUsuario = aluno.usuarioId;

      console.log("Usuario "+idUsuario);

      if (!usuarioData.cpf || !usuarioData.email) {
        if (req.query.format === 'json') {
          return res.status(400).json({ message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' });
        } else {
          return res.status(400).render('editar-aluno', {
            success: false,
            messageType: 'error',
            message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' 
          });
        }
      }

      const updatedUsuario = await UsuarioService.updateUsuario(idUsuario, usuarioData)

      console.log(updatedUsuario)

      if (req.query.format === 'json') {
        return res.status(201).json({ message: "Aluno criado com sucesso!", id });;
      } else {
        return res.redirect('/aluno?success=true&message=Aluno atualizado com sucesso.');
      }
  
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

  async exibirMenuAluno(req, res) {
    try {
      const { id } = req.params;
      const aluno = await AlunoService.getAlunoById(id);

      if (!aluno) {
        return res.status(404).render('404', { message: 'Aluno não encontrado' });
      }

      res.render('menu-aluno', { aluno });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao exibir menu do aluno', error });
    }
  }

  async processarEscolhaDisciplinas(req, res) {
    try {
      const { id } = req.params;
      const { materiaTipo } = req.body;

      if (!materiaTipo) {
        return res.status(400).render('menu-aluno', {
          aluno: await AlunoService.getAlunoById(id),
          message: 'Por favor, selecione um tipo de matéria.',
          messageType: 'error'
        });
      }

      
      if (materiaTipo === 'obrigatoria') {
        const disciplinasObrigatorias = await DisciplinaService.getDisciplinasObrigatorias();
        return res.render('disciplinas-obrigatorias', { disciplinas: disciplinasObrigatorias });
      } else {
        const disciplinasNaoObrigatorias = await DisciplinaService.getDisciplinasNaoObrigatorias();
        return res.render('disciplinas-nao-obrigatorias', { disciplinas: disciplinasNaoObrigatorias });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao processar escolha de disciplinas', error });
    }
  }
}