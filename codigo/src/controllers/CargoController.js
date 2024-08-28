import CargoService from '../services/CargoService.js';

export class CargoController {
  async getAll(req, res) {
    try {
      const cargos = await CargoService.getAllCargos();
      res.status(200).json(cargos);
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível buscar a lista de cargos. Por favor, tente novamente mais tarde.',
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const cargo = await CargoService.getCargoById(id);
      if (cargo) {
        res.status(200).json(cargo);
      } else {
        res.status(404).json({ message: `Cargo com ID ${id} não encontrado.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível buscar o cargo. Por favor, verifique o ID e tente novamente.',
        error: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const cargoData = req.body;
      const newCargo = await CargoService.createCargo(cargoData);
      res.status(201).json({ message: 'Cargo criado com sucesso.', cargo: newCargo });
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível criar o cargo. Verifique os dados fornecidos e tente novamente.',
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const cargoData = req.body;
      const updatedCargo = await CargoService.updateCargo(id, cargoData);
      if (updatedCargo) {
        res.status(200).json({ message: 'Cargo atualizado com sucesso.', cargo: updatedCargo });
      } else {
        res.status(404).json({ message: `Cargo com ID ${id} não encontrado para atualização.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível atualizar o cargo. Verifique os dados e tente novamente.',
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCargo = await CargoService.deleteCargo(id);
      if (deletedCargo) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: `Cargo com ID ${id} não encontrado para exclusão.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível deletar o cargo. Verifique o ID e tente novamente.',
        error: error.message,
      });
    }
  }
}
