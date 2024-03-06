// const Joi = require("joi");

// const favPicSchema = Joi.object({
//   user: Joi.string().required(),
//   favoritepic: Joi.array().items(
//     Joi.object({
//       title: Joi.string().required(),
//     })
//   ),
// });

// module.exports = { favPicSchema };

// vad ska jag ha för validering här?
//hur validerar vi för att spara i databasen?

// const Joi = require("joi");
// const user = Joi.object({
//   user: Joi.string().min(6).max(16).required(),
//   email:  Joi.string().email().required(),
//   password: Joi.string().min(8).max(16).required(),
//     })
//   ),
// });

const joi = require("joi");

const favPicSchema = joi.object({
  user: joi.string().required(),
  favoritePics: joi.array().items(
    joi.object({
      title: joi.string().required(),
      byteSize: joi.number().required(),
      url: joi.string().uri().required(),
    })
  ),
});

module.exports = { favPicSchema };
