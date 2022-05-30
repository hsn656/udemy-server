const User = require('../models/user');

class AuthService{
  constructor(){
  }

  login = async(email, password)=>{

  }

  register = async (email, password)=>{

  }

  getUsers = async (email)=>{
    return await User.findByEmail(email);
  }

}

module.exports = AuthService;
