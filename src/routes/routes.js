import { Router } from 'express';
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

// Rota para emissão de currículo
router.get('/', (req, res) => {
  const { semestre } = req.query;
  const curriculoUrl = semestre ? curriculos[semestre] : null;

  res.render('curriculo', {
    disciplinas,
    curriculoUrl
  });
});

export default router;
