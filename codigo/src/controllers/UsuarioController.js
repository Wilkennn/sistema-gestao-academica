import UsuarioService from '../services/UsuarioService.js';

export class UsuarioController {
  async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getAllUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível buscar a lista de usuários. Por favor, tente novamente mais tarde.',
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.getUsuarioById(id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ message: `Usuário com ID ${id} não encontrado.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível buscar o usuário. Por favor, verifique o ID e tente novamente.',
        error: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const usuarioData = req.body;
      const newUsuario = await UsuarioService.createUsuario(usuarioData);
      res.status(201).json({ message: 'Usuário criado com sucesso.', usuario: newUsuario });
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível criar o usuário. Verifique os dados fornecidos e tente novamente.',
        error: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuarioData = req.body;
      const updatedUsuario = await UsuarioService.updateUsuario(id, usuarioData);
      if (updatedUsuario) {
        res.status(200).json({ message: 'Usuário atualizado com sucesso.', usuario: updatedUsuario });
      } else {
        res.status(404).json({ message: `Usuário com ID ${id} não encontrado para atualização.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível atualizar o usuário. Verifique os dados e tente novamente.',
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await UsuarioService.deleteUsuario(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: `Usuário com ID ${id} não encontrado para exclusão.` });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Não foi possível deletar o usuário. Verifique o ID e tente novamente.',
        error: error.message
      });
    }
  }
}
