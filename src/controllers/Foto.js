import multer from 'multer';
import configFoto from '../config/multer';
import fotoModel from '../models/FotosAlunos';
import Alunos from '../models/Aluno';

const upload = multer(configFoto).single('arquivo');

class Foto {
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ errors: [err.code] });
      }

      const { originalname, filename } = req.file;
      const { id_alunos } = req.body;
      const alunos = await Alunos.findByPk(id_alunos);
      if (!alunos) {
        return res.status(400).json({ errors: ['aluno não encontrado'] });
      }

      const FotoAluno = await fotoModel.create({ id_alunos, originalname, filename });

      return res.json(FotoAluno);
    });
  }
}

export default new Foto();
