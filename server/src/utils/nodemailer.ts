import nodemailer from 'nodemailer';
import { BadRequestError } from '../errors';
import {
  NODEMAILER_SENDER_EMAIL,
  NODEMAILER_SENDER_EMAIL_PASSWORD,
} from '../server';

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: NODEMAILER_SENDER_EMAIL,
    pass: NODEMAILER_SENDER_EMAIL_PASSWORD,
  },
});
type SendMail = {
  to: string;
  otp: number;
};
export const sendMail = ({ to, otp }: SendMail) => {
  const options = {
    from: 'mohammedraqeeb999@outlook.com',
    to,
    subject: 'forgotten password',
    text: `your otp is ${otp}, it expires in 60 seconds`,
  };
  transporter.sendMail(options, function (err, info) {
    if (err) {
      throw new BadRequestError(
        'your email, was not sent,enter existing email'
      );
    }
  });
  return;
};
