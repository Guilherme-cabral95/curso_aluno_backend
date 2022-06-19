import jsonwebtoken from 'jsonwebtoken';
import UserModel from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ erro: ['login required'] });
  }
  const [, token] = authorization.split(' ');

  try {
    const data = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;
    const user = await UserModel.findOne({
      where: {
        id, email,
      },
    });

    if (!user) {
      return res.status(401).json({ erro: ['token expirado ou invalido'] });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({ erro: ['token expirado ou invalido'] });
  }
};
