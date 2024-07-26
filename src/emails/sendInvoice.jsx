const React = require('react');

const EmailTemplate = ({ firstName, lastName, QRImage, footer }) => (
  <html>
    <head>
      <title>Email Template</title>
    </head>
    <body>
      <h1>Hello, {firstName} {lastName}!</h1>
      <p><img src={QRImage} style={{height:100, width:100}}></img></p>
      <p>Best regards,<br />{footer}</p>
    </body>
  </html>
);

module.exports = EmailTemplate;