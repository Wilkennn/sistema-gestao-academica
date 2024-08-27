import CargoRepository from '../repository/CargoRepository.js';

export default class CargoService {
  constructor() {
    this.cargoRepository = new CargoRepository();
  }

  listarTodos(callback) {
    return this.cargoRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    return this.cargoRepository.getById(id, callback);
  }

  criar(cargo, callback) {
    return this.cargoRepository.create(cargo, callback);
  }

  atualizar(id, cargo, callback) {
    return this.cargoRepository.update(id, cargo, callback);
  }

  deletar(id, callback) {
    return this.cargoRepository.delete(id, callback);
  }
}
