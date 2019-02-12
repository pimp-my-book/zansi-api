const postmark = require("postmark");

const transport = new postmark.ServerClient("31a65312-7d40-4f46-ba65-eaba1eb54b21");

const mailTemp = text => `
Hello there!

${text}


From the team at Pimp My Book

`;

exports.transport = transport;
exports.mailTemp = mailTemp;
