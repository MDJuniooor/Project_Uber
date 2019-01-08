import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "waenfefnaksefn"
});

const sendEmail = (subject: string, html: string) => {
    const emailData = {
        from: "mmdsds@u.sogang.ac.kr",
        to: "mmdsds@u.sogang.ac.kr",
        subject,
        html
    };
    return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
   const emailSubject =  `Hello! ${fullName}, please verify your email`;
   const emailBody = `Verify your email by clicking <a href="http://www.naver.com/${key}">here</a>`
   return sendEmail(emailSubject,emailBody);
}