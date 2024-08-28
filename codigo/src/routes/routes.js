// routes/index.js
import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { AlunoController } from '../controllers/AlunoController.js';
import { CursoStatusController } from '../controllers/CursoStatusController.js';

const router = Router();

const usuarioController = new UsuarioController();
const alunoController = new AlunoController();
const cursoStatusController = new CursoStatusController();

// Rotas para usuário
router.get('/', usuarioController.getAll);
router.post('/usuario', usuarioController.create);

// Rotas para aluno
router.get('/alunos', alunoController.getAll);
router.post('/alunos', alunoController.create);

// Rotas para status de aluno
router.get('/curso-status', cursoStatusController.getAll);
router.get('/curso-status/:id', cursoStatusController.getById);
router.post('/curso-status', cursoStatusController.create);
router.put('/curso-status/:id', cursoStatusController.update);
router.delete('/curso-status/:id', cursoStatusController.delete);

export default router;
