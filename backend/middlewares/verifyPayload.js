const Joi = require("joi");

exports.verifyPayloadRelaisRecherche = (req, res, next) => {
  const schema = Joi.object({
    Pays: Joi.string().required(),
    NombreResultats: Joi.number().required(),
    Ville: Joi.string(),
    CP: Joi.number().required(),
  });
  
  const result = schema.validate(req.query);

  if (result.error)
    return res.status(400).send({ ok: false, msg: "Les paramètres rentrés sont invalides" });

  next();
};
