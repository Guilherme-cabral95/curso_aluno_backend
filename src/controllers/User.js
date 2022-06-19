import UserModel from '../models/User';

class User {
  async create(req, res) {
    try {
      const novoUser = await UserModel.create(req.body);
      const { id, nome, email } = novoUser;
      res.json({ id, nome, email });
    } catch (error) {
      res.status(400).json({ erros: error.errors.map((m) => m.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await UserModel.findAll();
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const users = await UserModel.findByPk(id);
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;
      if (!userId) {
        return res.status(400).json({ erros: ['usuário não enviado'] });
      }
      const users = await UserModel.findByPk(userId);

      if (!users) {
        return res.status(400).json({ erros: ['usuário não encontrado'] });
      }

      const user = await users.update(req.body);
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (error) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ erros: ['usuário não enviado'] });
      }
      const users = await UserModel.findByPk(id);

      if (!users) {
        return res.status(400).json({ erros: ['usuário não encontrado'] });
      }

      const user = await users.destroy();
      return res.json(user);
    } catch (error) {
      return res.json(null);
    }
  }
}

export default new User();
