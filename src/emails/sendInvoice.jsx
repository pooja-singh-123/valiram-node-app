const React = require('react');

const EmailTemplate = ({ name, message, footer }) => (
  <html>
    <head>
      <title>Email Template</title>
    </head>
    <body>
      <h1>Hello, {name}!</h1>
      <p>{message}</p>
      <p>Best regards,<br />{footer}</p>
    </body>
  </html>
);

module.exports = EmailTemplate;