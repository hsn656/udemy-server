class CourseController {
    constructor({ courseService }) {
        this.courseService = courseService;
    }

    findAll = async (req, res, next) => {
        try {
            const courses = await this.courseService.findAll();
            res.json(courses);
        } catch (err) {
            next(err);
        }
    }

    findById = async (req, res, next) => {
        try {
            const course = await this.courseService.findById(req.params.id);
            res.json(course);
        } catch (err) {
            next(err);
        }
    }

    create = async (req, res, next) => {
        try {
            const course = await this.courseService.create(req.body);
            res.json(course);
        } catch (err) {
            next(err);
        }
    }

}   

module.exports = CourseController;