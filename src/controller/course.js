class CourseController {
  constructor({ courseService, authService }) {
    this.courseService = courseService;
    this.authService = authService;
  }

  findAll = async (req, res, next) => {
    try {
      const courses = await this.courseService.findAll();
      res.json(courses);
    } catch (err) {
      next(err);
    }
  };

  findById = async (req, res, next) => {
    try {
      const course = await this.courseService.findById(req.params.id);
      res.json(course);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const course = await this.courseService.create(req.body, req.user);
      res.json(course);
    } catch (err) {
      next(err);
    }
  };

  createSection = async (req, res, next) => {
    try {
      await this.authService.verifyCourseOwner(req.params.id, req.user.id);

      const course = await this.courseService.createSection(
        req.params.id,
        req.body
      );
      res.json(course);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CourseController;
