import CursoService from '../services/CursoService.js';

export class CursoController {
  async getAll(req, res) {
    try {
      const cursos = await CursoService.getAllCursos();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const curso = await CursoService.getCursoById(id);
      if (curso) {
        res.status(200).json(curso);
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

      if (!cursoData.nome ||!cursoData.cargaHoraria) {
        return res.status(400).json({ message: 'Missing required fields: nome and cargaHoraria' });
      }

      const newCurso = await CursoService.createCurso(cursoData);
      res.status(201).json(newCurso);
    } catch (error) {
      res.status(500).json({ message: 'Error creating course', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const cursoData = req.body;
      const updatedCurso = await CursoService.updateCurso(id, cursoData);
      res.status(200).json(updatedCurso);
    } catch (error) {
      res.status(500).json({ message: 'Error updating course', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await CursoService.deleteCurso(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting course', error });
    }
  }
}
