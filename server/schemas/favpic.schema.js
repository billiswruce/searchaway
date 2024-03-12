const Joi = require("joi");

const favPicSchema = Joi.object({
  userId: Joi.string().required(),
  favorites: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        byteSize: Joi.number().required(),
        link: Joi.string().uri().required(),
      })
    )
    .required(),
});
module.exports = { favPicSchema };
