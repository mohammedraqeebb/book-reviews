import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ENVIRONMENT_VARIABLES = [
  'JWT_SECRET',
  'NODEMAILER_SENDER_EMAIL',
  'NODEMAILER_SENDER_EMAIL_PASSWORD',
  'MONGO_URI',
];

for (let i = 0; i < ENVIRONMENT_VARIABLES.length; i++) {
  if (!process.env[ENVIRONMENT_VARIABLES[i]]) {
    throw new Error(
      `environment variable ${ENVIRONMENT_VARIABLES[i]} not defined`
    );
  }
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const NODEMAILER_SENDER_EMAIL = process.env.NODEMAILER_SENDER_EMAIL;
export const NODEMAILER_SENDER_EMAIL_PASSWORD =
  process.env.NODEMAILER_SENDER_EMAIL_PASSWORD;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  mongoose.set('strictQuery', false);

  await mongoose
    .connect(MONGO_URI!)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`server is listening to ${PORT}`);
  });
};

app.listen();

startServer();
