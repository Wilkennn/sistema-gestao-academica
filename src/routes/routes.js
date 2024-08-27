import { Router } from 'express';
import { UsuarioController } from '../controller/UsuarioController.js'
const router = Router();

// Dados mock para disciplinas
const disciplinas = [
  { id: '1', nome: 'Matemática' },
  { id: '2', nome: 'Programação' },
  { id: '3', nome: 'Física' },
  { id: '4', nome: 'Química' }
];

// Dados mock para currículos
const curriculos = {
  '2024-1': 'https://example.com/curriculo_2024_1.pdf',
  '2024-2': 'https://example.com/curriculo_2024_2.pdf'
};

const usuarioController = new UsuarioController();

// Rota para emissão de currículo
router.get('/', usuarioController.create);

export default router;
