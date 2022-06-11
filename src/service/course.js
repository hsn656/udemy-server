const { object } = require("joi");
const ApiError = require("../error/api-error");
const Course = require("../models/course");
const user = require("../models/user");

class CourseService {
  constructor() {}

  findAll = async () => {
    const courses = await Course.find(
      {},
      {
        sections: 0,
      }
    );
    return courses;
  };

  findById = async (id) => {
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
  };

  create = async (course, user) => {
    Object.assign(course, {
      creator: {
        id: user.id,
        name: user.firstName + " " + user.lastName,
        image: user.image,
      },
    });
    return await Course.create(course);
  };

  createSection = async (courseId, section) => {
    const course = await this.findById(courseId);

    course.sections.push(section);
    await course.save();
    return course.sections;
  };
}

module.exports = CourseService;
