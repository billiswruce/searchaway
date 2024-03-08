const joi = require("joi");

const favPicSchema = joi.object({
  userId: joi.string().required(),
  favorites: joi.array().items(
    joi.object({
      title: joi.string().required(),
      byteSize: joi.number().required(),
      url: joi.string().uri().required(),
    })
  ),
});

module.exports = { favPicSchema };
