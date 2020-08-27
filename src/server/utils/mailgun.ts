import * as mailgunLoader from 'mailgun-js';
import config from '../config';

const mailgun = mailgunLoader({ 
    apiKey: config.mailgun.key,
    domain: config.mailgun.domain
});

export const sendEmail = (to: string, from: string, subject: string, content: string) => {
    const data = {
        to,
        from,
        subject,
        text: content
    }
    return mailgun.messages().send(data);
};