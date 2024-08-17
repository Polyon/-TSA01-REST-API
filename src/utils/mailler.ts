import { createTransport, Transporter, SendMailOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import environment from '../environments/environment.config';
import { BadRequest, CustomError } from './customError';


/**
 * The `Mailer` class is responsible for sending emails using the SMTP protocol.
 * It uses the Nodemailer library to create a transporter and send the email.
 */
export default class Mailer {
    private _mailerMail: string;
    private _mailerPassword: string;
    private _transporter: Transporter<SMTPTransport.SentMessageInfo>;
    /**
     * Initializes the `Mailer` class by setting the email and password for the mailer
     * and creating a transporter using the Nodemailer library.
     */
    constructor() {
        this._mailerMail = environment.MAILER_EMAIL;
        this._mailerPassword = environment.MAILER_PASS;
        this._transporter = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: this._mailerMail,
                pass: this._mailerPassword,
            },
        });
    }
    /**
     * Sends an email using the SMTP protocol.
     * @param {string} to - The email address of the recipient.
     * @param {string} subject - The subject of the email.
     * @param {string} body - The body/content of the email.
     * @param {string} cc (optional) - The email address(es) to be CC'd.
     * @param {string} bcc (optional) - The email address(es) to be BCC'd.
     * @returns {Promise<SMTPTransport.SentMessageInfo>} - A promise that resolves to the data object containing information about the sent email.
     * @throws {BadRequest} - If the receiver mail is null or empty.
     * @throws {CustomError} - If there is an error sending the email.
     */
    async sendMail(to: string, subject: string, body: string, cc?: string, bcc?: string): Promise<SMTPTransport.SentMessageInfo> {
        if (!to || !subject) {
            throw new BadRequest("Receiver mail and subject cannot be null or empty");
        }
        try {
            let mailOptions: SendMailOptions = {
                from: this._mailerMail,
                to,
                cc,
                bcc,
                subject,
                html: body,
            };
            let info: SMTPTransport.SentMessageInfo = await this._transporter.sendMail(mailOptions);
            return info;
        } catch (error: any) {
            throw new CustomError(error);
        }
    }
}


