// routes/index.js
import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { AlunoController } from '../controllers/AlunoController.js';
import { AlunoStatusController } from '../controllers/AlunoStatusController.js'; // Importando corretamente

const router = Router();

const usuarioController = new UsuarioController();
const alunoController = new AlunoController();
const alunoStatusController = new AlunoStatusController(); // Usando a classe importada corretamente

// Rotas para usuário
router.get('/', usuarioController.getAll);
router.post('/usuario', usuarioController.create);

// Rotas para aluno
router.get('/alunos', alunoController.getAll);
router.post('/alunos', alunoController.create);

// Rotas para status de aluno
router.get('/aluno-status', alunoStatusController.getAll);
router.get('/aluno-status/:id', alunoStatusController.getById);
router.post('/aluno-status', alunoStatusController.create);
router.put('/aluno-status/:id', alunoStatusController.update);
router.delete('/aluno-status/:id', alunoStatusController.delete);

export default router;
