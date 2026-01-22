const jwt = require('jsonwebtoken');


const token = jwt.sign(
  { userId: user._id, role: user.role, email: user.email }, 
  process.env.JWT_SECRET || 'your_jwt_secret_key',          
  { expiresIn: '1h' }                                       
);


res.json({
  success: true,
  token,            
  message: 'Login successful',
  user: {
    email: user.email,
    role: user.role,
  }
});
