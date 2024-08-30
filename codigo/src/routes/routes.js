// routes/index.js
import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { AlunoController } from '../controllers/AlunoController.js';
import { FuncionarioController } from '../controllers/FuncionarioController.js';
import { CursoController } from '../controllers/CursoController.js';
import { DisciplinaController } from '../controllers/DisciplinaController.js';
import { AlunoDisciplinaController } from '../controllers/AlunoDisciplinaController.js';
import { CursoAlunoController } from '../controllers/CursoAlunoController.js';


const router = Router();

const cursoController = new CursoController();
const usuarioController = new UsuarioController();
const alunoController = new AlunoController();
const funcionarioController = new FuncionarioController();
const disciplinaController = new DisciplinaController();
const alunoDisciplinaController = new AlunoDisciplinaController();
const cursoAlunoController = new CursoAlunoController();


// Rotas para usuário
router.get('/usuario', usuarioController.getAll);
router.get('/usuario/:id', usuarioController.getById);
router.post('/usuario', usuarioController.create);
router.put('/usuario/:id', usuarioController.update);
router.delete('/usuario/:id', usuarioController.delete);

// Rotas para aluno
router.get('/aluno', alunoController.getAll);
router.get('/aluno/:id', alunoController.getById);
router.post('/aluno', alunoController.create);
router.put('/aluno/:id', alunoController.update);
router.delete('/aluno/:id', alunoController.delete);

// Rotas para funcionario
router.get('/funcionario', funcionarioController.getAll);
router.get('/funcionario/:id', funcionarioController.getById);
router.post('/funcionario', funcionarioController.create);
router.put('/funcionario/:id', funcionarioController.update);
router.delete('/funcionario/:id', funcionarioController.delete);

// Rotas para curso
router.get('/curso', cursoController.getAll);
router.get('/curso/:id', cursoController.getById);
router.post('/curso', cursoController.create);
router.put('/curso/:id', cursoController.update);
router.delete('/curso/:id', cursoController.delete);

// Rotas para disciplina
router.get('/disciplina', disciplinaController.getAll);
router.get('/disciplina/:id', disciplinaController.getById);
router.post('/disciplina', disciplinaController.create);
router.put('/disciplina/:id', disciplinaController.update);
router.delete('/disciplina/:id', disciplinaController.delete);

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



export default router;
