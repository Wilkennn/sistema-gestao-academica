// controllers/UsuarioController.js
import UsuarioService from '../services/UsuarioService.js';

class UsuarioController {
  async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getAllUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.getUsuarioById(id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  }

  async create(req, res) {
    try {
      const usuarioData = req.body;
      const newUsuario = await UsuarioService.createUsuario(usuarioData);
      res.status(201).json(newUsuario);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuarioData = req.body;
      const updatedUsuario = await UsuarioService.updateUsuario(id, usuarioData);
      res.status(200).json(updatedUsuario);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await UsuarioService.deleteUsuario(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}

export default new UsuarioController();
