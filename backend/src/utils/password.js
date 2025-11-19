import bcrypt from 'bcryptjs';

const saltRounds = 12;

export const hashPassword = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

