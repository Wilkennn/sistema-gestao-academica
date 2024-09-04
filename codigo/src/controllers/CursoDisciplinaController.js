import { json } from 'express';
import CursoDisciplinaService from '../services/CursoDisciplinaService.js';

export class CursoDisciplinaController {
  
  async addDisciplinaToCurso(req, res) {
    const { cursoId, disciplinaId, periodo } = req.body;

    try {
      const result = await CursoDisciplinaService.addDisciplinaToCurso(cursoId, disciplinaId, periodo);

      return res.redirect(`/curso-grade-curricular/${cursoId}?success=true&message=Disciplina vinculada com sucesso!&messageType=success`);

    } catch (error) {
      res.redirect(`/curso-grade-curricular/${cursoId}?success=false&message=Disciplina já está vinculada!&messageType=error`);
    }
  }

  async removeDisciplinaFromCurso(req, res) {
    const { cursoId, disciplinaId, periodo } = req.body;

    try {
      const result = await CursoDisciplinaService.removeDisciplinaFromCurso(cursoId, disciplinaId, periodo);
      return res.redirect(`/curso-grade-curricular/${cursoId}?success=true&message=Disciplina removida com sucesso!&messageType=success`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDisciplinasByCurso(req, res) {
    const cursoId = parseInt(req.params.cursoId, 10);

    try {
      const result = await CursoDisciplinaService.getDisciplinasByCurso(cursoId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCursosByDisciplina(req, res) {
    const disciplinaId = parseInt(req.params.disciplinaId, 10);

    try {
      const result = await CursoDisciplinaService.getCursosByDisciplina(disciplinaId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
