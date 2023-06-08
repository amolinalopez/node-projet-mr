const {
  enseigne,
} = require("../constants");
const { hashedKey } = require("../utils/hash");
const { fetchPointRelais } = require("../utils/fetch");

exports.getPointRelais = async (req, res) => {
  const listOfParams = [{ Enseigne: enseigne }];

  Object.keys(req.query).forEach((key) =>
    listOfParams.push({ [key]: req.query[key] })
  );

  hashedKey(listOfParams);

  fetchPointRelais(listOfParams, res);
};