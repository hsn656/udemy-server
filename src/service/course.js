const ApiError = require('../error/api-error');
const Course = require('../models/course');
const user = require('../models/user');


class CourseService{
  constructor(){
  }

  findAll = async()=>{
    try{
      const courses = await Course.find({},{
        sections:0,
      });
      return courses;
    }
    catch(err){
      throw ApiError.internalServerError(err.message);
    }
  }

  findById = async(id)=>{  
    try{
    const course = await Course.findById({_id:id},{
      sections:{
        items:{
          uri:0,
          quiz:0
        }
      }
    });
    if(!course){
      throw ApiError.notFound('Course not found');
    }
    return course;
    }
    catch(err){
      throw ApiError.internalServerError(err.message);
    }
  }

  create = async(course)=>{
    try{
    return await Course.create(course);
    }
    catch(err){
      throw ApiError.internalServerError(err.message);
    }
  }

}

module.exports = CourseService;
