'use strict'

const mongoose = require('mongoose');
const chalk = require('chalk');
const app = require('./app')
const config = require('./config')
// CHALK CONFIG
const connected = chalk.bold.cyan;
const error = chalk.bold.red;
const termination = chalk.bold.magenta;
const action = chalk.bold.gray;



mongoose.connect(config.db,(err, res)=>{
  if(err){
    return console.log(error("Error al conectar BBDD"))
  }
  connected('Conexión a BBDD OK....');
  console.log(connected('Conexión a BBDD OK....'));
  app.listen(config.port, () =>{
      console.log(connected(`API REST corriendo en http://localhost:${config.port}`));
   })
})
