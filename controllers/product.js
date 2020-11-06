'use strict'
const Product = require('../models/product')
const chalk = require('chalk');

const connected = chalk.bold.cyan;
const error = chalk.bold.red;
const termination = chalk.bold.magenta;
const action = chalk.bold.gray;
//==============================================================================//
function getProduct(req, res){
  console.log(action('GET /api/product:id'));

  let productId = req.params.productId;
  Product.findById(productId,(err, product)=>{
    if(err) {
      console.log(error( `Error al realizar la petición${err}`));
      return (res.status(500).send({message: `Error al realizar la petición${err}`}))
  }
  if(!product){return res.status(404).send({message:`No existe el producto`});}
  res.status(200).send({ product });
  })
}
//==============================================================================//

function getProducts(req,res){
  console.log(action('GET /api/product:'));

  Product.find({}, (err, products)=>{
    if(err) {
      console.log(error( `Error al realizar la petición${err}`));
      return res.status(500).send({message: `Error al realizar la petición${err}`})
  }
  if(!products) return res.status(404).send({message:`No existen el productos`})
  res.status(200).send({ products });
  })
}
//==============================================================================//

function saveProduct(req,res){

    console.log(action('POST /api/product'));
    //res.status(200).send({message: 'El producto se ha Recibido'});
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.description = req.body.description;

  product.save((err,productStored)=>{  //GUARDAR EN BBDD
    if(err)res.status(500).send({message: `Error al salvar en base de datos: ${err}`});  // SI HAY ERROR::::::
    res.status(200).send({product: productStored})
    return;
    })
}
function updateProduct(req,res){
  console.log(action('PUT /api/product'));

  let productId = req.params.productId;
  let update = req.body;
  Product.findByIdAndUpdate(productId, update, (err,productUpdated)=>{
  if(err)res.status(500).send({message: `Error al actualizar producto:  ${err}`});  // SI HAY ERROR::::::
  res.status(200).send({ product:productUpdated });
  })
}

function deleteProduct(req,res){
  console.log(action('DELETE /api/product:id'));

  let productId = req.params.productId;
  Product.findById(productId, (err, product) =>{

    if(!product){
      console.log(action('INVALID DELETE /api/product:id'));
      return res.status(404).send({message:`No existe el producto`});
    }

    product.remove(err =>{
      if(err)res.status(500).send({message: `Error al borrar producto:  ${err}`});  // SI HAY ERROR::::::
      res.status(200).send({message: 'El producto ha sido borrado'})
    })
  })
}
module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  saveProduct
}
