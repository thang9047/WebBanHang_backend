const mongoose = require('mongoose')

const productSchema= new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    
  },
  collections: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  concentration: {
    type: String,
  },
  fragrance_group: {
    type: String
  },
  style: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  images:{
    type: Object,
    required: true
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  sold: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('products', productSchema)
