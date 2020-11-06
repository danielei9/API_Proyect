'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
  email: {type: String, unique:true, lowercase:true},
  displayName: String,
  avatar: String, //url
  password: {type: String, select:false}, //no enviar a BBDD = false
  signupDate: {type: Date, default: Date.now()},
  lastLogin: Date
})

UserSchema.pre('save', (next) =>{ //Antes de cargar el esquema en la bbdd
  let user = this;
  //if(!user.isModified('password'))return next()

  bcrypt.genSalt(10,(err, salt) =>{
  if(err) return next()

  bcrypt.hash(user.password, salt, null, (err, hash)=>{
    if(err) return next(err)

    user.password = hash
    next()
    })
  })
})

UserSchema.methods.gravatar = function (){
  if(!this.email)return `https://gravatar.com/avatar/?s=2006d=retro` //AVATAR POR DEFECTo

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=2006d=retro`
}

module.exports = mongoose.model('User', UserSchema);
