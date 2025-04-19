import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connections = {};

const getDbUriByRole = (role) => {
  switch (role) {
    case 'CEO': return process.env.MONGO_URI_CEO;
    case 'Senior Manager': return process.env.MONGO_URI_SENIOR;
    case 'Product Manager': return process.env.MONGO_URI_PRODUCT;
    default: throw new Error('Invalid role');
  }
};

export const getDbConnection = async (role) => {
  if (connections[role]) return connections[role];

  const uri = getDbUriByRole(role);
  const conn = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  connections[role] = conn;
  return conn;
};
