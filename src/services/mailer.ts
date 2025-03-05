import { throws } from 'assert';
import nodemailer from 'nodemailer';
import envVars  from '../config/config';

class Email {
    transport;

    constructor() {
        this.transport = nodemailer.createTransport({
            host: envVars.smtp.host,
            port: envVars.smtp.port,
            secure: false, // use SSL
            auth: {
              user: envVars.smtp.user,
              pass: envVars.smtp.pass,
            }
        })
        if (envVars.env !== 'test') {
            this.transport
              .verify()
              .then(() => console.info('Connected to email server'))
              .catch(() => console.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
          }
    }
    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: 'systemuser@email.com',
            to,
            subject,
            text
        };

        // Send the email
        this.transport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    async sendPassword(to: string, password: string) {
        this.sendEmail(to, 'Your password', `Your new password is: ${password}`);
    }
}

export default new Email();
