// routes/index.js

import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { AlunoController } from '../controllers/AlunoController.js';
import { FuncionarioController } from '../controllers/FuncionarioController.js';
import { CursoController } from '../controllers/CursoController.js';
import { DisciplinaController } from '../controllers/DisciplinaController.js';
import { AlunoDisciplinaController } from '../controllers/AlunoDisciplinaController.js';
import { CursoAlunoController } from '../controllers/CursoAlunoController.js';
import { CursoDisciplinaController } from '../controllers/CursoDisciplinaController.js'

const router = Router();

const cursoController = new CursoController();
const usuarioController = new UsuarioController();
const alunoController = new AlunoController();
const funcionarioController = new FuncionarioController();
const disciplinaController = new DisciplinaController();
const alunoDisciplinaController = new AlunoDisciplinaController();
const cursoAlunoController = new CursoAlunoController();
const cursoDisciplinaController = new CursoDisciplinaController();

// Rotas para usuário
router.get('/usuario', usuarioController.getAll);
router.get('/usuario/:id', usuarioController.getById);
router.post('/usuario', usuarioController.create);
router.put('/usuario/:id', usuarioController.update);
router.delete('/usuario/:id', usuarioController.delete);

// Rotas para aluno sistema
router.get('/aluno', alunoController.getAll);
router.get('/aluno/:id', alunoController.getById);
router.get('/editar-aluno/:id', alunoController.getById);
router.put('/aluno/:id/', alunoController.update);
router.get('/aluno/:id/adicionar-curso', alunoController.mostrarCursos);
router.post('/aluno/:id/adicionar-curso', alunoController.addCurso);
router.get('/aluno-cadastrar', (req, res) => {
    const { success, message, messageType } = req.query;
    res.render('cadastrar-aluno', {
        success: success || false,
        messageType: messageType || '',
        message: message || ''
    });
});
router.post('/aluno/cadastrar', alunoController.create);
router.delete('/aluno/:id/deletar-aluno', alunoController.delete);

// Nova rota para exibir o menu do aluno
router.get('/menu-aluno/:id', alunoController.exibirMenuAluno);

// Nova rota para processar a escolha do tipo de matéria
router.post('/menu-aluno/:id/disciplinas', alunoController.processarEscolhaDisciplinas);

// Rotas para aluno de aluno
router.get('/login-aluno',(req, res) => {
    res.render('login-aluno')
});
router.get('/menu-aluno/disciplinas/:id', alunoController.getById)

// Rotas para sistema funcionario
router.get('/funcionarios', funcionarioController.getAll);
router.get('/funcionarios/:id', funcionarioController.getById);
router.post('/funcionarios', funcionarioController.create);
router.put('/funcionarios', funcionarioController.update);
router.post('/funcionarios/:id/deletar', funcionarioController.delete);

router.get('/adicionar-funcionario', (req, res) => {
    const { success, message, messageType } = req.query;
    res.render('adicionar-funcionario', {
        success: success || false,
        messageType: messageType || '',
        message: message || ''
    });
});

// Rotas para curso
router.get('/curso', cursoController.getAll);
router.get('/curso/:id', cursoController.getById);
router.post('/curso', cursoController.create);
router.put('/curso/:id', cursoController.update);
router.delete('/curso', cursoController.delete);

router.get('/adicionar-curso', (req, res) => {
    const { success, message, messageType } = req.query;
    res.render('adicionar-curso', {
        success: success || false,
        messageType: messageType || '',
        message: message || ''
    });
});

router.get('/curso-grade-curricular/:id', cursoController.gerarCurriculo)

// Rotas para disciplina
router.get('/disciplina', disciplinaController.getAll);
router.get('/disciplina/:id', disciplinaController.getById);
router.put('/disciplina/:id', disciplinaController.update);
router.delete('/disciplina/:id', disciplinaController.delete);
router.get('/cadastrar-disciplina', (req, res) => {
    res.render('cadastrar-disciplina')
});
router.post('/cadastrar-disciplina', disciplinaController.create);

// Rotas para Aluno_Disciplina
router.get('/aluno-disciplina', alunoDisciplinaController.getAll);
router.get('/aluno-disciplina/:id', alunoDisciplinaController.getById);
router.post('/aluno-disciplina', alunoDisciplinaController.create);
router.put('/aluno-disciplina/:id', alunoDisciplinaController.update);
router.delete('/aluno-disciplina/:id', alunoDisciplinaController.delete);

// Rotas para Curso_Aluno
router.get('/curso-aluno', cursoAlunoController.getAll);
router.get('/curso-aluno/:id/:id', cursoAlunoController.getById);
router.post('/curso-aluno', cursoAlunoController.create);
router.put('/curso-aluno/:id/:id', cursoAlunoController.update);
router.delete('/curso-aluno/:id/:id', cursoAlunoController.delete);

router.post('/curso-disciplina', cursoDisciplinaController.addDisciplinaToCurso);
router.delete('/curso-disciplina', cursoDisciplinaController.removeDisciplinaFromCurso);
router.get('/curso-disciplina/:id', cursoDisciplinaController.getDisciplinasByCurso);
router.get('/curso-disciplina', cursoDisciplinaController.getCursosByDisciplina);

export default router;
