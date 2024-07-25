const React = require('react');
const ReactDOMServer = require('react-dom/server');
const postmark = require('postmark');
require('@babel/register')({ extensions: ['.jsx'] });

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const EmailTemplate = require('./src/emails/sendInvoice.jsx');

const sendEmail = async (to, subject, templateData) => {

    // Render the JSX component to HTML
    const htmlContent = ReactDOMServer.renderToStaticMarkup(
        React.createElement(EmailTemplate, templateData)
    );

  const mailOptions = {
    From: 'pooja.singh@ranosys.com',
    To: to,
    Subject: subject,
    HtmlBody: htmlContent,
  };

  try {
    let info = await client.sendEmail(mailOptions);
    console.log('Email sent: ' + info);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

module.exports = sendEmail;