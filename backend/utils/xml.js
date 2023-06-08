exports.generateXmlData = (endpoint, listOfParams) => {

    console.log(`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <${endpoint} xmlns="http://www.mondialrelay.fr/webservice/">${listOfParams.map((el) => (
            el ? `    <${Object.keys(el)}>${Object.values(el)}</${Object.keys(el)}>` : ''
        )).join('')}
        </${endpoint}>
    </soap:Body>
</soap:Envelope>`);

    return (
        `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <${endpoint} xmlns="http://www.mondialrelay.fr/webservice/">${listOfParams.map((el) => (
                    el ? `    <${Object.keys(el)}>${Object.values(el)}</${Object.keys(el)}>` : ''
                )).join('')}
                </${endpoint}>
            </soap:Body>
        </soap:Envelope>`
    );
} 