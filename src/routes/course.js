const express = require("express");
const { container } = require("../di-setup");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");

const InitCourseDto = require("../dto/Course/initCourseDto");
const AddSectionDto = require("../dto/Course/addSectionDto");

const courseController = container.resolve("courseController");

const router = express.Router();
router.get("/", courseController.findAll);
router.get("/:id", courseController.findById);
router.post("/", verifyToken, validate(InitCourseDto), courseController.create);
router.post(
  "/:id/sections",
  verifyToken,
  validate(AddSectionDto),
  courseController.createSection
);

module.exports = router;
