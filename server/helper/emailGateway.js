//import package

import nodemailer from 'nodemailer';

// import lib
import config from '../config/config'

const sendEmail =( async (to, content) => {
    try {
        const { subject, template } = content;
        console.log(subject,'subject')
        let transporter = nodemailer.createTransport(config.emailGateway.nodemailer);
        let info = await transporter.sendMail({
            from: config.emailGateway.fromMail,
            to,
            subject,
            html: template
        });
        console.log("Message sent: %s", info.messageId);
    }
    catch (err) {
        console.log("-----err", err)
    }
})

export
{
    sendEmail
}