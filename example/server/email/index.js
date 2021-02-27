const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default sendPasswordResetEmail (email) {
  const msg = {
    to: email, // Change to your recipient
    from: 'sendgrid@dons.dev', // Change to your verified sender
    subject: 'Reset password for Authenticare example',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
