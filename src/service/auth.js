const ApiError = require("../error/api-error");
const User = require("../models/user");
const Course = require("../models/course");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor({ courseService }) {
    this.courseService = courseService;
  }

  login = async (email, password) => {
    const user = await User.findByEmail(email);
    if (!user) {
      throw ApiError.badRequest("email or password is incorrect");
    }

    const isPasswordValid = await this.isPasswordValid(password, user);

    if (!isPasswordValid) {
      throw ApiError.badRequest("email or password is incorrect");
    }

    const token = await this.generateToken(user);

    return { accessToken: token };
  };

  register = async (firstName, lastName, email, password, image) => {
    const alreadyRegisterUser = await User.findByEmail(email);
    if (alreadyRegisterUser) {
      throw ApiError.badRequest("email already exists");
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      image,
    });
    const token = await this.generateToken(user);
    return { accessToken: token };
  };

  verifyCourseOwner = async (courseId, userId) => {
    const course = await this.courseService.findById(courseId);

    if (course.creator.id.toString() !== userId) {
      throw ApiError.forbidden("You are not the owner of this course");
    }
  };

  findByEmail = async (email) => {
    return await User.findByEmail(email);
  };

  hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
  };

  isPasswordValid = async (password, user) => {
    return await bcrypt.compare(password, user.password);
  };

  generateToken = async (user) => {
    const payload = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      image: user.image,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    return token;
  };
}

module.exports = AuthService;
