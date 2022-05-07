const router = require('express').Router()
const auth = require('../middleware/authen')
const authAdmin = require('../middleware/authenAdmin')
const fs = require('fs')
const cloudinary = require('cloudinary')
const { resourceUsage } = require('process')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload',auth, authAdmin, (req, res) => {
  try {
    if(!req.files || Object.keys(req.files).length === 0) 
      return res.status(400).json({msg: "No file uploaded"})

    const file = req.files.file
    
    if(file.size > 1024*1024){
      removeTemPath(file.tempFilePath)
      return res.status(400).json({msg: "Size too large !"})
    }

    if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
      removeTemPath(file.tempFilePath)
      return res.status(400).json({msg: "File format is incorrect !"})
    }

    cloudinary.v2.uploader.upload(file.tempFilePath, {folder: 'test1'}, async (err, result) => {
      if(err) throw err;

      removeTemPath(file.tempFilePath)
      res.json({public_id: result.public_id, url: result.secure_url})
    })
  } catch (err) {
    return res.status(500).json({msg: err.mesage})
  }
})

router.post('/destroy',auth, authAdmin, (req, res) => {
  try {
    const {public_id} = req.body

    if(!public_id) return res.status(400).json({msg: "No Image Selected !"})

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({msg: "Deleted"})
    })
  } catch (err) {
    return res.status(500).json({msg: err.mesage})
  }
})

const removeTemPath = (path) => {
  fs.unlink(path, err=> {
    if(err) throw err;
  }) 
}

module.exports = router