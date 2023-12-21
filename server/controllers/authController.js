//controllers/authController.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
};

exports.verifyToken = (req, res) => {
  // Récupérer le token du header d'autorisation
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'No token provided',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid token',
      });
    }

    // Si le token est valide, renvoyer une réponse positive
    res.status(200).json({
      status: 'success',
      message: 'Token is valid',
      data: {
        userId: decoded.id,
      },
    });
  });
};