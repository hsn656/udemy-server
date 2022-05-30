const ApiError = require('../error/api-error');
const User = require('../models/user');
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');




class AuthService{
  constructor(){
  }

  login = async(email, password)=>{
    const user = await User.findByEmail(email);
    if(!user){
      throw ApiError.badRequest('email or password is incorrect');
    }

    const isPasswordValid = await this.#isPasswordValid(password,user);
    
    if(!isPasswordValid){
      throw ApiError.badRequest('email or password is incorrect');
    }

    const token = await this.#generateToken(user);

    return {accessToken: token};
  }

  register = async (firstName,lastName,email, password)=>{
    const alreadyRegisterUser = await User.findByEmail(email);
    if(alreadyRegisterUser){
      throw ApiError.badRequest('email already exists');
    }

    const hashedPassword = await this.#hashPassword(password);
    try {
      const user = await User.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName:lastName
      });
      return user;
    } catch (error) {
      throw ApiError.internal(error.message);
    }

  }

  findByEmail = async (email)=>{
    return await User.findByEmail(email);
  }

  #hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
  }

  #isPasswordValid = async(password,user)=>{
    return await bcrypt.compare(password,user.password);
  }

  #generateToken = async (user)=>{
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: "3d" })
    return token;
  }

}

module.exports = AuthService;
