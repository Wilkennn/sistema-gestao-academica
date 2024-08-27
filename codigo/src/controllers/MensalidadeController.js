// controllers/MensalidadeController.js
import MensalidadeService from '../services/MensalidadeService.js';

class MensalidadeController {
  async getAll(req, res) {
    try {
      const mensalidades = await MensalidadeService.getAllMensalidades();
      res.status(200).json(mensalidades);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payments', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const mensalidade = await MensalidadeService.getMensalidadeById(id);
      if (mensalidade) {
        res.status(200).json(mensalidade);
      } else {
        res.status(404).json({ message: 'Payment not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payment', error });
    }
  }

  async create(req, res) {
    try {
      const mensalidadeData = req.body;
      const newMensalidade = await MensalidadeService.createMensalidade(mensalidadeData);
      res.status(201).json(newMensalidade);
    } catch (error) {
      res.status(500).json({ message: 'Error creating payment', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const mensalidadeData = req.body;
      const updatedMensalidade = await MensalidadeService.updateMensalidade(id, mensalidadeData);
      res.status(200).json(updatedMensalidade);
    } catch (error) {
      res.status(500).json({ message: 'Error updating payment', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await MensalidadeService.deleteMensalidade(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting payment', error });
    }
  }
}

export default new MensalidadeController();
