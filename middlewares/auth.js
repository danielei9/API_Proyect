'use strict'
const services = require('../service/services')

function isAuth(req, res, next){
  if(!req.headers.authorization){ // si existe en el header del request el obj authorization
    return res.status(403).send({message: 'No tienes autorización'})
  }
  const token = req.headers.authorization.split(' ')[1] // token de la cabecera , split es para desglosar en un array con tantos elementos como elementos hay

  services.decodeToken(token)
  .then(response =>{
    req.User = response
    next()
  })
  .catch(response =>{
    res.status(response.status)
  })
  }
  module.exports = isAuth
