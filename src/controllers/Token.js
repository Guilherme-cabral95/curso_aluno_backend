import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User';

class Token {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(400).json({ erro: ['vocês deve digitar senha ou usuário'] });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ erro: ['usuário não encontrado'] });
    }

    if (!(await user.passwordCompare(password))) {
      return res.status(400).json({ erro: ['senha invalida'] });
    }
    // console.log(user);
    const { id } = user;

    const token = jsonwebtoken.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new Token();
