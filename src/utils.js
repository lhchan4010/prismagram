import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

//랜덤 문구를 생성
export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

//이메일 전송
export const sendMail = (email) => {
  const option = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransport(option));
  return client.sendMail(email);
};

//랜덤 문구를 이메일로 전송
export const sendSecretMail = (address, secret) => {
  const email = {
    from: "lhchan4010@gmail.com",
    to: address,
    subject: "🔐 Login Secret for Prismagram",
    html: ` Hello! Your login secret it <strong>${secret}</strong>`,
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
