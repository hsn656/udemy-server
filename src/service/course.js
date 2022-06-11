const { object } = require("joi");
const ApiError = require("../error/api-error");
const Course = require("../models/course");
const user = require("../models/user");

class CourseService {
  constructor() {}

  findAll = async () => {
    try {
      const courses = await Course.find(
        {},
        {
          sections: 0,
        }
      );
      return courses;
    } catch (err) {
      throw ApiError.internal(err.message);
    }
  };

  findById = async (id) => {
    try {
      const course = await Course.findById(
        { _id: id },
        {
          sections: {
            items: {
              uri: 0,
              quiz: 0,
            },
          },
        }
      );
      if (!course) {
        throw ApiError.notFound("Course not found");
      }
      return course;
    } catch (err) {
      throw ApiError.internal(err.message);
    }
  };

  create = async (course, user) => {
    Object.assign(course, {
      creator: {
        id: user.id,
        name: user.firstName + " " + user.lastName,
        image: user.image,
      },
    });
    try {
      return await Course.create(course);
    } catch (err) {
      throw ApiError.internal(err.message);
    }
  };

  createSection = async (courseId, section) => {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        throw ApiError.notFound("Course not found");
      }

      if (course.creator.id !== user.id) {
        throw ApiError.forbidden("You are not the owener of this course");
      }

      course.sections.push(section);
      await course.save();
      return course.sections;
    } catch (err) {
      throw ApiError.internal(err.message);
    }
  };
}

module.exports = CourseService;
