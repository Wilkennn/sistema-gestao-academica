import FuncionarioService from '../services/FuncionarioService.js';
import UsuarioService from '../services/UsuarioService.js';

export class FuncionarioController {

  async getAll(req, res) {
    try {
      const funcionarios = await FuncionarioService.getAllFuncionarios();
      if (req.query.format === 'json') {
        return res.status(200).json(funcionarios);
      } else {
        return res.status(200).render('funcionarios', { funcionarios });
      }
    } catch (error) {
      if (req.query.format === 'json') {
        return res.status(500).json({ message: 'Error fetching employees', error: error.message });
      } else {
        return res.status(500).render('error', { message: 'Erro ao buscar funcionários', error: error.message });
      }
    }
  }

  async getById(req, res) {

    try {
      const { id } = req.params;
      const { success, message, messageType } = req.query;
      const funcionario = await FuncionarioService.getFuncionarioById(id);

      if (req.query.format === 'json') {
        return res.status(200).json(funcionario);
      }else {
        return res.status(200).render('editar-funcionarios', {
          funcionario,
          success: success || false,
          messageType: messageType || '',
          message: message || ''
        });
      }

    } catch (error) {
      if (req.query.format === 'json') {
        return res.status(500).json({ message: 'Error fetching employee', error: error.message });
      } else {
        return res.status(500).render('error', { message: 'Erro ao buscar funcionário', error: error.message });
      }
    }
  }

  async create(req, res) {
    try {
      const usuarioData = (({ nome, email, cpf, endereco, login, senha, telefone, dataNascimento }) => ({ nome, email, cpf, endereco, login, senha, telefone, dataNascimento }))(req.body);
      const funcionarioData = (({ salario, cargo, dataAdmissao }) => ({ salario, cargo, dataAdmissao }))(req.body);
    
      if (!funcionarioData.salario || !funcionarioData.dataAdmissao) {
        if (req.query.format === 'json') {
          return res.status(400).json({ message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' });
        } else {
          return res.status(400).render('adicionar-funcionario', {
            success: false,
            messageType: 'error',
            message: 'Dados incompletos. Por favor, forneça todos os campos necessários.'
          });
        }
      }

      if (funcionarioData.usuarioId && isNaN(Number(funcionarioData.usuarioId))) {
        if (req.query.format === 'json') {
          return res.status(400).json({ message: 'usuarioId inválido. Deve ser um número.' });
        } else {
          return res.status(400).render('adicionar-funcionario', {
            success: false,
            messageType: 'error',
            message: 'usuarioId inválido. Deve ser um número.'
          });
        }
      }

      const newUsuario = await UsuarioService.createUsuario(usuarioData);

      funcionarioData.usuarioId = newUsuario.id;

      const newFuncionario = await FuncionarioService.createFuncionario(funcionarioData);

      if (req.query.format === 'json') {
        return res.status(201).json(newFuncionario);
      } else {
        return res.redirect('/adicionar-funcionario?success=true&message=Funcionário criado com sucesso!&messageType=success');
      }

    } catch (error) {
      if (req.query.format === 'json') {
        return res.status(500).json({ success: false, message: error.message });
      } else {
        return res.status(500).render('adicionar-funcionario', { 
          success: false, 
          messageType: 'error', 
          message: 'Erro ao criar o funcionário!' 
        });
      }
    }
  }

  async update(req, res) {
    try {
      const usuarioData = (({ nome, email, cpf, endereco, login, telefone, dataNascimento }) => ({ nome, email, cpf, endereco, login, telefone, dataNascimento }))(req.body);
      const funcionarioData = (({ salario, cargo, dataAdmissao }) => ({ salario, cargo, dataAdmissao }))(req.body);

      const { funcionarioId, usuarioId  } = req.query;

      if (!funcionarioData.salario || !funcionarioData.dataAdmissao) {
        if (req.query.format === 'json') {
          return res.status(400).json({ message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' });
        } else {
          return res.status(400).render('editar-funcionarios', {
            success: false,
            messageType: 'error',
            message: 'Dados incompletos. Por favor, forneça todos os campos necessários.' 
          });
        }
      }

      const updatedUsuario = await UsuarioService.updateUsuario(usuarioId, usuarioData);
      const updatedFuncionario = await FuncionarioService.updateFuncionario(funcionarioId, funcionarioData);

      if (req.query.format === 'json') {
        return res.status(200).json({updatedFuncionario, updatedUsuario});
      } else {
        return res.redirect(`/funcionarios/${funcionarioId}?success=true&message=Funcionário atualizado com sucesso!&messageType=success`);
      }
    } catch (error) {
      console.log(error)
      if (req.query.format === 'json') {
        return res.status(500).json({ success: false, message: 'Error updating employee', error: error.message });
      } else {
        return res.status(500).render('editar-funcionarios', {
          success: false,
          messageType: 'error',
          message: 'Erro ao atualizar o funcionário!'
        });
      }
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await FuncionarioService.deleteFuncionario(id);

      if (req.query.format === 'json') {
        return res.status(204).send();
      } else {
        return res.redirect('/funcionarios?success=true&message=Funcionário excluído com sucesso!&messageType=success');
      }
    } catch (error) {
      if (req.query.format === 'json') {
        return res.status(500).json({ message: 'Error deleting employee', error: error.message });
      } else {
        return res.status(500).render('error', { message: 'Erro ao excluir funcionário', error: error.message });
      }
    }
  }
}
