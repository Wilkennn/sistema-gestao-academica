import autoBind from 'auto-bind';
import { UserService } from '../service/userService';

export class UserController {

    constructor(){
        this.userService = new UserService();
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { email, name, cpf, telefone, addresses, role, password } = request.body;
            const user = await this.userService.createUser({ email, name, cpf, telefone, addresses, role, password });

            return response.status(200).json({  success: true, message: "Usuário criado com sucesso", user });
        } catch (error) {
            console.error("Erro ao criar usuário:", error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async read(request, response) {
        try {

            const queryParams = request.query;
            const users = await this.userService.getUser(queryParams);

            if (users.length === 0) {
                return response.status(404).json({ error: "Nenhum usuário encontrado com os parâmetros fornecidos" });
            }

            return response.json({  success: true, message: "Usuários encontrados", users });
        } catch (error) {
            console.error("Erro ao ler usuários:", error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        try {
            const { id, email, name, cpf, telefone, password } = request.body;

            const updatedUser = await this.userService.updateUser({ id, email, name, cpf, telefone, password });

            return response.status(200).json({ success: true, message: "Usuário atualizado com sucesso", user: updatedUser });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async updateAddresses(request, response) {
        try {
            const { id, addresses } = request.body;

            const updatedUser = await this.userService.updateAddresses(parseInt(id), addresses);

            return response.status(200).json({ success: true, message: "Endereço do usuário atualizado com sucesso", user: updatedUser });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error.message);
            return response.status(500).json({ success: false, error: "Erro interno do servidor" });
        }
    }
    
    async removeAddress(request, response) {
        try {
            const { userId, addressId } = request.body;
    
            const updatedUser = await this.userService.removeAddress(parseInt(userId), parseInt(addressId));
    
            return response.status(200).json({ success: true, message: "Endereço do usuário removido com sucesso", user: updatedUser });
        } catch (error) {
            console.error("Erro ao remover endereço:", error.message);
            return response.status(500).json({ success: false, error: "Erro interno do servidor" });
        }
    }
    
    async delete(request, response) {
        try {
            const { id } = request.body;

            const deletedUser = await this.userService.deleteUser(id);

            return response.json({  success: true, message: "Usuário deletado com sucesso", user: deletedUser });
        } catch (error) {
            console.error("Erro ao deletar usuário:", error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}