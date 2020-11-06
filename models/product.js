'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
    picture:String,
    price: Number,
//  category: { type: String, enum:['buchspill','buchspro']},
    description: String
})

 //mongoose.model('Product',ProductSchema); // Permite acceder al modelo con => const Product = require(./models/product)
module.exports  = mongoose.model('Product',ProductSchema); // Permite acceder al modelo con => const Product = require(./models/product)
//mongoose.model('Product',ProductSchema); // Permite acceder al modelo con => const Product = require(./models/product)
