const Product = require('../models/productModel')

const productCtrl = {
  getProduct: async (req, res) => {
    try {
      const products = await Product.find()
      res.json({
        status: "success",
        result: products.length,
        products: products
      })
    } catch (err) {
      console.log(err.message)
      window.location.href = 'https://stackoverflow.com/search?q=[Js]+' + err.message; 
      return res.status(500).json({msg: err.message})
    }
  },
  createProduct: async (req, res) => {
    try {
      const {product_id, brand,name,sex,origin,collections,price,concentration,fragrance_group,style,description,images,sold} = req.body

      if(!images) return res.status(400).json({msg: "No Image Uploaded"})

      const product = await Product.findOne({product_id})

      if(product) return res.status(400).json({msg: "Sản phẩm đã tồn tại"})

      const newProduct = new Product({product_id, brand,name,sex,origin,collections,price,concentration,fragrance_group,style,description,images,sold})

      await newProduct.save()
      res.status(200).json({msg: "Created product"})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {brand,name,sex,origin,collections,price,concentration,fragrance_group,style,description,images,sold} = req.body

      if(!images) return res.status(400).json({msg: "No Image Uploaded"})

      await Product.findByIdAndUpdate({_id: req.params.id}, {
        brand,name,sex,origin,collections,price,concentration,fragrance_group,style,description,images,sold
      })
      res.json({msg: "done update"})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.idid)
      res.json({msg: "delete product "})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}


module.exports = productCtrl
















