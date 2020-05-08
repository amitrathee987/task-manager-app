const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from:'amit@tieinup.com',
        subject:'Thanks for joining us!',
        text: `Welcome to the Task APP, ${name}. Let me know how you get along with the app.`
    })
}


const sendCancelEmail = (email,name) => {
    sgMail.send({
        to: email,
        from:'amit@tieinup.com',
        subject:'Account deleted successfully!',
        text: `Hey ${name}, your account is successfully deleted. Can we know, why you delete the app?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}