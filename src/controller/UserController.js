import autoBind from 'auto-bind';
import { UserService } from './UserService.js';
import { UserRepository } from './UserRepository.js';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
    
  constructor() {
    this.userService = userService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { email, name, cpf, telefone, addresses, role, password } = request.body;
      const user = await this.userService.createUser({ email, name, cpf, telefone, addresses, role, password });

      return response.status(201).json({ success: true, message: 'Usuário criado com sucesso', user });
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async get(request, response) {
    try {
      const userId = parseInt(request.params.id, 10);
      const user = await this.userService.getUserById(userId);

      if (user) {
        return response.status(200).json({ success: true, user });
      } else {
        return response.status(404).json({ success: false, message: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao obter usuário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const userId = parseInt(request.params.id, 10);
      const { email, name, cpf, telefone, addresses, role, password } = request.body;
      await this.userService.updateUser(userId, { email, name, cpf, telefone, addresses, role, password });

      return response.status(200).json({ success: true, message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const userId = parseInt(request.params.id, 10);
      await this.userService.deleteUser(userId);

      return response.status(200).json({ success: true, message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
