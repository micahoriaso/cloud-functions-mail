const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "your@email.com",
        pass: "coolpassword"
    }
});



exports.sendmail = functions.https.onRequest((request, response) => {

    cors(request, response, () => {

        const destination = request.query.destination;

        const mailOptions = {
            from: 'Micah Oriaso <supersecretemail@gmail.com>',
            to: destination,
            subject: 'Henmlo',
            html: '<b>Henmlo there</b>'
        }

        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return response.send(error.toString())
            }
            return response.send('Sent!!!')
        });

    });

});
