const Category = require('../models/categoryModel')

const categoryController = {
    viewCategory: async (req , res ) =>{
        try {
            const categoryes = await Category.find()
            res.json(categoryes)
        } catch (error) {
        return res.status(500).json({msg : error.message })
        }
    },
    creatCategory : async(req , res ) =>{
        try {
            const {name} = req.body;
            const  category = await Category.findOne({name});
            if(category) return res.status(400).json({msg : "This category already exists."})
            const addCategory = new Category({name})
            await addCategory.save()
            res.json ({msg : "Successfully added! "})
        } catch (error) {
            return res.status(500).json({msg : error.message })
        }   
    },
    updateCategory : async(req , res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})
            res.json({msg : "Successfully update!"})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = categoryController