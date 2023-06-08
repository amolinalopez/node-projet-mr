const { privateKey } = require("../constants")
const crypto = require('crypto');

exports.hashedKey = (listOfParams) => {
    const key = [...listOfParams.map((el) => el ? Object.values(el) : ''), privateKey].join("");

    const hashedKey = crypto.createHash('MD5').update(key).digest("hex").toUpperCase();

    listOfParams.push({Security: hashedKey});
}