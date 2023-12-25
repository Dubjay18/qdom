import APIError from '@/errors/ApiError';
import JLogger from '@/utils/logger';
import nodemailer from 'nodemailer';
import Mailgen from "mailgen"

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Initialize the transporter with your email service provider configuration
        this.transporter = nodemailer.createTransport({
            // Configure your email service provider settings here
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MT_USER,
                pass: process.env.MT_PASSWORD
            }
        });
    }

    sendEmail(to: string, subject: string, body: string): void {
        const MailGenerator = new Mailgen({
            theme: "salted",
            product : {
                name: "Test Email",
                link: 'https://mailgen.js/'
            }
        })
        
        const emailToBeSent = {
            body : {
                name: "QDOM",
                intro : body,
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }
        const emailBody = MailGenerator.generate(emailToBeSent);
        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.MT_EMAIL,
            to,
            subject,
            html: emailBody
        };

        // Send the email using the transporter
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                JLogger(process.env.MT_USER as any);

                throw new APIError(
                    'Error sending email',
                    500,
                    error
                );
                
                
            
            } else {
                JLogger(info.response);
            }
        });
    }
}

export default EmailService;
