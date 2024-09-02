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
router.post('/aluno/:id/editar', alunoController.update);
router.get('/aluno/:id/editar', (req, res) => { req.query.page = 'editar'; alunoController.getById(req, res); });
router.delete('/aluno/:id/deletar', alunoController.delete);
router.get('/aluno/:id/deletar', alunoController.getAll);
router.get('/aluno/:id/adicionar-curso', alunoController.mostrarCursos);

router.post('/aluno/:id/adicionar-curso', alunoController.addCurso);
router.get('/aluno-cadastrar', (req, res) => {
    console.log('Acessando a página de cadastro de aluno');
    res.render('cadastrar-aluno')
    });
router.post('/aluno/cadastrar', alunoController.create);

// Rotas para funcionario
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


// Rotas para curso'
router.get('/curso', cursoController.getAll);
router.get('/curso/:id', cursoController.getById);
router.post('/curso', cursoController.create);
router.put('/curso/:id', cursoController.update);
router.delete('/curso/:id', cursoController.delete);

router.get('/adicionar-curso', (req, res) => {

    const { success, message, messageType } = req.query;

    res.render('adicionar-curso', {
        success: success || false,
        messageType: messageType || '',
        message: message || ''
    });
});

router.get('/adicionar-curso', (req, res) => {

    const { success, message, messageType } = req.query;

    res.render('adicionar-curso', {
        success: success || false,
        messageType: messageType || '',
        message: message || ''
    });
});


// Rotas para disciplina
router.get('/disciplina', disciplinaController.getAll);
router.get('/disciplina/:id', disciplinaController.getById);
router.put('/disciplina/:id', disciplinaController.update);
router.delete('/disciplina/:id', disciplinaController.delete);
router.get('/cadastrar-disciplina', (req, res) => {
    console.log('Acessando a página de cadastro de disciplina');
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



export default router;
