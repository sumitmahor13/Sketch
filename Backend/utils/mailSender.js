import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config()

const mailSendar = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
                from: 'StudyNotion || Sumit Mahor',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
        return info;
    } catch (error) {
        console.error("Error while sending mail", err);
    }
}

export default mailSendar;