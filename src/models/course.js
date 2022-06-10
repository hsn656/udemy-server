const { string } = require("joi");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
    isPublished: { type: Boolean, default: false },
    rating: { type: Number, default: null },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: Array, default: [] },
    price: { type: Number, required: true },
    students: { type: Array, default: [] },
    sections: {
      type: [
        {
          id: { type: mongoose.Schema.Types.ObjectId },
          name: { type: String, required: true },
          items: {
            type: [
              {
                id: { type: mongoose.Schema.Types.ObjectId },
                name: { type: String, required: true },
                type: {
                  type: String,
                  default: "video",
                  enum: ["video", "quiz"],
                },
                uri: { type: String, required: false },
                quiz: {
                  type: {
                    id: { type: mongoose.Schema.Types.ObjectId },
                    name: { type: String, required: true },
                    questions: [
                      {
                        id: { type: mongoose.Schema.Types.ObjectId },
                        question: { type: String, required: true },
                        answers: [
                          {
                            id: { type: mongoose.Schema.Types.ObjectId },
                            answer: { type: String, required: true },
                            isCorrect: { type: Boolean, required: true },
                          },
                        ],
                      },
                    ],
                  },
                  required: false,
                },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
