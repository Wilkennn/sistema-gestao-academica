// routes/index.js
import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { AlunoController } from '../controllers/AlunoController.js';
import { CursoStatusController } from '../controllers/CursoStatusController.js';
import { CargoController } from '../controllers/CargoController.js';
import { FuncionarioController } from '../controllers/FuncionarioController.js';
import { CursoController } from '../controllers/CursoController.js';
import { DisciplinaController } from '../controllers/DisciplinaController.js';

const router = Router();

const cursoController = new CursoController();
const usuarioController = new UsuarioController();
const alunoController = new AlunoController();
const cursoStatusController = new CursoStatusController();
const cargoController = new CargoController();
const funcionarioController = new FuncionarioController();
const disciplinaController = new DisciplinaController();

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

// Rotas para cargo
router.get('/cargo', cargoController.getAll);
router.get('/cargo/:id', cargoController.getById);
router.post('/cargo', cargoController.create);
router.put('/cargo/:id', cargoController.update);
router.delete('/cargo/:id', cargoController.delete);

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

// Rotas para status de aluno
router.get('/curso-status', cursoStatusController.getAll);
router.get('/curso-status/:id', cursoStatusController.getById);
router.post('/curso-status', cursoStatusController.create);
router.put('/curso-status/:id', cursoStatusController.update);
router.delete('/curso-status/:id', cursoStatusController.delete);

// Rotas para status de disciplina
router.get('/disciplina', disciplinaController.getAll);
router.get('/disciplina/:id', disciplinaController.getById);
router.post('/disciplina', disciplinaController.create);
router.put('/disciplina/:id', disciplinaController.update);
router.delete('/disciplina/:id', disciplinaController.delete);


export default router;
