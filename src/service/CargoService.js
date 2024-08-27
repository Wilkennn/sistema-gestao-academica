import CargoRepository from '../repository/CargoRepository.js';

export default class CargoService {
  constructor() {
    this.cargoRepository = new CargoRepository();
  }

  listarTodos(callback) {
    this.cargoRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    this.cargoRepository.getById(id, callback);
  }

  criar(cargo, callback) {
    this.cargoRepository.create(cargo, callback);
  }

  atualizar(id, cargo, callback) {
    this.cargoRepository.update(id, cargo, callback);
  }

  deletar(id, callback) {
    this.cargoRepository.delete(id, callback);
  }
}
