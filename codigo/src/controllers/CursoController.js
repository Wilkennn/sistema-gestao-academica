import CursoService from '../services/CursoService.js';
import DisciplinaService from '../services/DisciplinaService.js';
import CursoDisciplinaService from '../services/CursoDisciplinaService.js';

export class CursoController {

  async getAll(req, res) {
    try {

      const cursos = await CursoService.getAllCursos();

      if (req.query.format === 'json') {
        return res.status(200).json(cursos);
      } else {
        return res.render('cursos', { cursos });
      }

    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error });
    }
  }

  async getById(req, res) {
    try {

      const { id } = req.params;
      const { success, message, messageType } = req.query;
      const curso = await CursoService.getCursoById(id);

      if (curso) {
        res.status(200).render('editar-curso', {
          curso,
          success: success || false,
          messageType: messageType || '',
          message: message || ''
        });
      } else {
        res.status(404).json({ message: 'Course not found' });
      }

    } catch (error) {
      res.status(500).json({ message: 'Error fetching course', error });
    }
  }


  async create(req, res) {
    try {
      const cursoData = req.body;

      if (!cursoData.nome || !cursoData.cargaHoraria) {
        return res.status(400).json({ message: 'Missing required fields: nome and cargaHoraria' });
      }

      cursoData.duracao = parseInt(cursoData.duracao);
      cursoData.creditos = parseInt(cursoData.creditos);
      cursoData.cargaHoraria = parseInt(cursoData.cargaHoraria);

      const newCurso = await CursoService.createCurso(cursoData);

      if (req.query.format === 'json') {
        return res.status(201).json(newCurso);
      } else {
        return res.redirect('/adicionar-curso?success=true&message=Curso criado com sucesso!&messageType=success');
      }

    } catch (error) {
      if (req.query.format === 'json') {
        return res.status(500).json({ success: false, message: error })
      } else {
        return res.status(500).render('adicionar-curso', { success: false, messageType: 'error', message: "Erro ao criar o curso! <i class='fas fa-check error-icon'></i>" });
      }
    }
  }

  async update(req, res) {

    try {
      const { id } = req.params;
      const cursoData = req.body;

      cursoData.duracao = parseInt(cursoData.duracao, 10);
      cursoData.creditos = parseInt(cursoData.creditos, 10);
      cursoData.cargaHoraria = parseInt(cursoData.cargaHoraria, 10);

      if (!cursoData.nome || !cursoData.cargaHoraria) {
        return res.status(400).json({ message: 'Missing required fields: nome and cargaHoraria' });
      }

      const updatedCurso = await CursoService.updateCurso(id, cursoData);

      if (req.query.format === 'json') {
        return res.status(200).json(updatedCurso);
      } else {
        return res.redirect(`/curso/${id}?success=true&message=Curso atualizado com sucesso!&messageType=success`);
      }

    } catch (error) {
      if (req.query.format === 'json') {
        return res.status(500).json({ success: false, message: 'Error updating course', error });
      } else {
        return res.status(500).render('editar-curso', {
          success: false,
          messageType: 'error',
          message: "Erro ao atualizar o curso! <i class='fas fa-check error-icon'></i>"
        });
      }
    }
  }

  async delete(req, res) {
    try {
      const { cursoId } = req.body;

      const curso = await CursoService.deleteCurso(cursoId);

      if (req.query.format === 'json') {
        return res.status(200).json(curso);
      } else {
        return res.status(204).redirect(`/curso`);
      }

    } catch (error) {
      res.status(500).json({ message: 'Error deleting course', error});
    }
  }

  async gerarCurriculo(req, res) {

    const { id } = req.params;

    const { success, message, messageType } = req.query;


    const curso = await CursoDisciplinaService.getDisciplinasByCurso(parseInt(id));

    const disciplinas = await DisciplinaService.getAllDisciplinas();

    //return res.status(200).json( { curso, disciplinas } );

    res.status(200).render('curso-grade-curricular', {
      curso,
      disciplinas,
      success: success || false,
      messageType: messageType || '',
      message: message || ''
    });
  }
}
