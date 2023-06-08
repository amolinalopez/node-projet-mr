const parseString = require("xml2js").parseString;

const {
  urlPointRelais,
  endpointPointRelaisRecherche,
} = require("../constants");
const { generateXmlData } = require("./xml");
const { responseFormat } = require("./responseFormat");

exports.fetchPointRelais = async (listOfParams, res) => {
  try {
    const fetchResponse = await fetch(urlPointRelais, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
      },
      body: generateXmlData(endpointPointRelaisRecherche, listOfParams),
    });

    const xmlResult = await fetchResponse.text();
    const result = await new Promise((resolve, reject) => {
      parseString(xmlResult, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const responseData = responseFormat(result);
    res.send(responseData);

    listOfParams.length = 0;
  } catch (error) {
    res.status(500).send({
      ok: false,
      msg: error.message || "Something went wrong with the request",
    });
  }
};

//   fetch(urlPointRelais, {
//     method: "POST",
//     headers: {
//       "Content-Type": "text/xml",
//     },
//     body: generateXmlData(endpointPointRelaisRecherche, listOfParams),
//   })
//     .then((response) => response.text())
//     .then((xmlResult) => {
//       parseString(xmlResult, (err, result) => {
//         const response = responseFormat(result);

//         if (err) {
//           res.status(400).send({
//             ok: false,
//             msg: err,
//           });
//         } else {
//           res.send({ data: response });
//         }
//       });
//     })
//     .then((listOfParams.length = 0))
//     .catch(() =>
//       res.status(400).send({
//         ok: false,
//         msg: "Something went wrong with the request",
//       })
//     );