import AlunosModel from '../models/Aluno';
import FotosAlunos from '../models/FotosAlunos';

class Alunos {
  async create(req, res) {
    try {
      const novoAluno = await AlunosModel.create(req.body);
      // const { id, nome, email } = novoAluno;
      res.json({ novoAluno });
    } catch (error) {
      res.status(400).json({ erros: error.errors.map((m) => m.message) });
    }
  }

  async index(req, res) {
    try {
      const alunos = await AlunosModel.findAll({
        attributes: ['nome', 'sobrenome', 'email', 'data_nascimento'],
        // order: [['foto_aluno', 'id', 'DESC']],
        include: {
          model: FotosAlunos,
          attributes: ['url', 'originalname', 'filename'],

          order: [['id', 'DESC']],
          limit: 1,
        },
      });
      return res.json(alunos);
    } catch (error) {
      return res.json(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const alunos = await AlunosModel.findByPk(id, {
        attributes: ['nome', 'sobrenome', 'email', 'data_nascimento'],
        // order: [['foto_aluno', 'id', 'DESC']],
        include: {
          model: FotosAlunos,
          attributes: ['url', 'originalname', 'filename'],
          order: [['id', 'DESC']],
          limit: 1,
        },
      });
      return res.json(alunos);
    } catch (error) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ erros: ['aluno não enviado'] });
      }
      const aluno = await AlunosModel.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ erros: ['aluno não encontrado'] });
      }

      const updated = await aluno.update(req.body);
      // const { id, nome, email } = user;
      return res.json(updated);
    } catch (error) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ erros: ['aluno não enviado'] });
      }
      const aluno = await AlunosModel.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ erros: ['aluno não encontrado'] });
      }

      const deleted = await aluno.destroy();
      return res.json(deleted);
    } catch (error) {
      return res.json(null);
    }
  }
}

export default new Alunos();
