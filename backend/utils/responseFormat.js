exports.responseFormat = (result) => {
  const data =
    result["soap:Envelope"]["soap:Body"][0][
      "WSI4_PointRelais_RechercheResponse"
    ][0]["WSI4_PointRelais_RechercheResult"][0]["PointsRelais"][0][
      "PointRelais_Details"
    ];

  const response = [];

  data.forEach((el, index) =>
    response.push({
      ville: data[index]["Ville"].toString().trim(),
      pays: data[index]["Pays"].toString().trim(),
      cp: data[index]["CP"].toString().trim(),
      num: data[index]["Num"].toString().trim(),
      photo: data[index]["URL_Photo"].toString().trim(),
      plan: data[index]["URL_Plan"].toString().trim(),
      disponibilite: data[index]["Distance"].toString().trim(),
      name: data[index]["LgAdr1"].toString().trim(),
      adresse: data[index]["LgAdr3"].toString().trim(),
      localisation: [
        data[index]["Localisation1"].toString().trim(),
        data[index]["Localisation2"].toString().trim(),
      ],
      coordonnees: {
        latitude: data[index]["Latitude"].toString().trim(),
        longitude: data[index]["Longitude"].toString().trim(),
      },
      horaires: [
        {
          lundi: {
            debut: data[index]["Horaires_Lundi"][0]["string"][0]
              .toString()
              .trim(),
            fin: data[index]["Horaires_Lundi"][0]["string"][1]
              .toString()
              .trim(),
          },
        },
        {
          mardi: {
            debut: data[index]["Horaires_Mardi"][0]["string"][0]
              .toString()
              .trim(),
            fin: data[index]["Horaires_Mardi"][0]["string"][1]
              .toString()
              .trim(),
          },
        },
        {
          mercredi: {
            debut: data[index]["Horaires_Mercredi"][0]["string"][0]
              .toString()
              .trim(),
            fin: data[index]["Horaires_Mercredi"][0]["string"][1]
              .toString()
              .trim(),
          },
        },
        {
          jeudi: {
            debut: data[index]["Horaires_Jeudi"][0]["string"][0]
              .toString()
              .trim(),
            fin: data[index]["Horaires_Jeudi"][0]["string"][1]
              .toString()
              .trim(),
          },
        },
        {
          vendredi: {
            debut: data[index]["Horaires_Vendredi"][0]["string"][0]
              .toString()
              .trim(),
            fin: data[index]["Horaires_Vendredi"][0]["string"][1]
              .toString()
              .trim(),
          },
        },
        {
          samedi: {
            debut: data[index]["Horaires_Samedi"][0]["string"][0]
              .toString()
              .trim(),
            fin: data[index]["Horaires_Samedi"][0]["string"][1]
              .toString()
              .trim(),
          },
        },
        {
          dimanche: {
            debut: data[index]["Horaires_Dimanche"][0]["string"][0]
              .toString()
              .trim(),
            fin: data[index]["Horaires_Dimanche"][0]["string"][1]
              .toString()
              .trim(),
          },
        },
      ],
    })
  );

  console.log(response);

  return response;
};
