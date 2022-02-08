const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // on va utliser sc validateur comme un plugin pour l'appliquer au shéma

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);