import { prismaClient } from '../database/prismaClient.js';

class CargoService {
  async getAllCargos() {
    return prismaClient.cargo.findMany();
  }

  async getCargoById(id) {
    return prismaClient.cargo.findUnique({
      where: { id: Number(id) },
    });
  }

  async createCargo(cargoData) {
    return prismaClient.cargo.create({
      data: cargoData,
    });
  }

  async updateCargo(id, cargoData) {
    return prismaClient.cargo.update({
      where: { id: Number(id) },
      data: cargoData,
    });
  }

  async deleteCargo(id) {
    return prismaClient.cargo.delete({
      where: { id: Number(id) },
    });
  }
}

export default new CargoService();
