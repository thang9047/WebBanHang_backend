const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
  register: async (req, res) => {
    try{
      const {name, email, password, role} = req.body
      const user = await Users.findOne({email})
      if(user) return res.status(400).json({msg: "Email đã tồn tại !"})

      if (password.length < 6) {
        return res.status(500).json({msg: "Mật khẩu ít nhất 6 kí tự"})
      }
      
      //  Password encryption
      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = new Users({
        name, email, password: passwordHash, role
      })

      // save to MongDB
      await newUser.save()
      // Create Json Web token
      const accessToken = createAccessToken({id: newUser._id})
      const refreshToken = createRefreshToken({id: newUser._id})

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token'
      })
      res.json({accessToken})
    }
    catch(err) {
      return res.status(500).json({msg: err.message})
    }
  },

  login: async (req,res) => {
    try {
      const {email, password} = req.body

      const user = await Users.findOne({email})

      if(!user) return res.json({msg: "User không tồn tại !"})

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) return res.json({msg: "Sai mật khẩu !"})

      //  If login success, create token and refresh_token

      const accessToken = createAccessToken({id: user._id})
      const refreshToken = createRefreshToken({id: user._id})

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token'
      })
      res.json({accessToken})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
      return res.json({msg: "Logout"})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  refreshToken: (req, res) => {
    try{
      const rf_token = req.cookies.refreshtoken
      if(!rf_token) {
        return res.status(400).json({msg: "Please Login or Register"})
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
        if(err) {
          return res.status(400).json({msg: "Please Login or Register"})
        }
        const accesstoken = createAccessToken({id: user.id})
        res.json({accesstoken})
      })
    }
    catch (err) {
      return res.status(500).json({msg: err.message})
    }
    
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password')
      if (!user) return res.status(400).json({msg: "User does not exist"})

      res.json(user)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: '7d'})
}

module.exports = userController