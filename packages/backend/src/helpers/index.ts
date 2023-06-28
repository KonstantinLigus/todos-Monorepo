/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import { ISendEmailPops, ISendMailOptions, ISendPassword } from '../types/todos.type';

dotenv.config();

const { SEND_GRID_EMAIL_API_KEY, EMAIL_FROM, BASE_URL } = process.env;

const sendEmail = async ({ email, verificationToken, isVerify, newPassword }: ISendMailOptions) => {
  if (SEND_GRID_EMAIL_API_KEY && EMAIL_FROM) {
    sgMail.setApiKey(SEND_GRID_EMAIL_API_KEY);
    const msg = {
      to: email,
      from: EMAIL_FROM,
      subject: isVerify ? 'User verificaton' : 'Change password',
      html: isVerify
        ? `<a href="${BASE_URL}/api/user/verify/${verificationToken}">Press this link for verifing your email</a>`
        : `<p>${newPassword}<p>`
    };
    await sgMail.send(msg);
  }
};

export const sendVerificationTokenByEmail = async ({
  email,
  verificationToken
}: ISendEmailPops) => {
  await sendEmail({ email, verificationToken, isVerify: true });
};

export const sendNewPasswordByEmail = async ({ email, newPassword }: ISendPassword) => {
  await sendEmail({ email, newPassword, isVerify: false });
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const isValidPassword = async (password: string, hashedPassword: string) => {
  const isTheSame = await bcrypt.compare(password, hashedPassword);
  return isTheSame;
};

export const genetateUUID = () => {
  const generetedID = uuid();
  return generetedID;
};

export const getToken = (data: { id: string }) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
};
