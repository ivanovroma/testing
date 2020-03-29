import jsonwebtoken from 'jsonwebtoken'

import UserModel from '../api/User/model'

export default async (req, res, next) => {
  const token = req.headers['authorization']

  // Проверяем наличие токена в запросе
  if (!token) {
    return res.json({
      success: false,
      error: 'jsonwebtoken_invalid'
    })
  }

  // Достаем _id пользователя из токена
  let tokenObj
  try {
    tokenObj = jsonwebtoken.verify(token, 'secret')
  } catch (e) {
    return res.json({
      success: false,
      error: 'jsonwebtoken_invalid'
    })
  }

  // Находим пользователя в БД по _id и передаем дальше
  try {
    const user = await UserModel.findOne({ _id: tokenObj._id })
    user.password = 0
    req.user = user
    next()
  } catch (e) {
    return res.json({
      success: false,
      error: 'jsonwebtoken_invalid'
    })
  }
}