const express = require('express')
const authController = require('../controllers/auth-controller')
const authenticate = require('../middlewares/authenticate')

const authRoute = express.Router()

authRoute.post('/register',authController.register)
authRoute.post('/login', authController.login)
authRoute.get('/me',authenticate ,authController.getme)
authRoute.get('/verify/:token', async (req, res) => {
    const { token } = req.params;
  
    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
    });
  
    if (!user) {
      return res.status(400).json({ message: 'Invalid token or user not found' });
    }
  
    await prisma.user.update({
      where: { email: user.email },
      data: { verificationToken: null, verified: true },
    });
  
    res.status(200).json({ message: 'Email verified successfully' });
  });


module.exports = authRoute