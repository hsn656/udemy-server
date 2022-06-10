const express = require("express");
const { container } = require("../di-setup");
const InitCourseDto = require("../dto/Course/initCourseDto");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");

const courseController = container.resolve("courseController");

const router = express.Router();
router.get("/", courseController.findAll);
router.get("/:id", courseController.findById);
router.post("/", verifyToken, validate(InitCourseDto), courseController.create);

module.exports = router;
