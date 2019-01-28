const postmark = require("postmark");

const transport = new postmark.ServerClient("2bf8257c-c345-4f43-b553-611a60c7b789");

const mailTemp = text => `
Hello there!

${text}


From the team at Pimp My Book

`;

exports.transport = transport;
exports.mailTemp = mailTemp;