const mongoose = require("mongoose");
const Joi = require("joi");


const RequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required."],
  },
  description: {
    type: String,
    required: [true, "description is required."],
  },
  status: {
    type: String,
    required: [true, "status is required."],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

  },
  creationDate: {
    type: Date,
    default: new Date()

  },
  creatorName: {
    type: String,

  }
},
  { strict: false });




const Request = new mongoose.model("Request", RequestSchema);


const validateRequest = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(50).required(),
    description: Joi.string().min(4).max(200).required(),
    status: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateRequest,
  Request
};
