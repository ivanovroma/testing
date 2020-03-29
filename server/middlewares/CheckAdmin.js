export default async (req, res, next) => {
  const token = req.headers['authorization']

  // Проверяем наличие пользователя в запросе
  if (!req.user) {
    return res.json({
      success: false,
      error: 'req_user_is_invalid'
    })
  }

  // Проверяем роль пользователя
  if (req.user.role !== 'admin') {
    return res.json({
      success: false,
      error: 'req_user_is_not_admin'
    })
  }

  next()
}