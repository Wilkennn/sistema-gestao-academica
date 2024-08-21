export class UserService {
    
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async createUser(user) {
      try {
        await this.userRepository.create(user);
        console.log('Usuário criado com sucesso.');
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
      }
    }
  
    async getUserById(userId) {
      try {
        const user = await this.userRepository.getById(userId);
        if (user) {
          console.log('Usuário encontrado:', user);
        } else {
          console.log('Usuário não encontrado.');
        }
        return user;
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
      }
    }
  
    async updateUser(userId, user) {
      try {
        await this.userRepository.update(userId, user);
        console.log('Usuário atualizado com sucesso.');
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    }
  
    async deleteUser(userId) {
      try {
        await this.userRepository.delete(userId);
        console.log('Usuário deletado com sucesso.');
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
      }
    }
  }
  