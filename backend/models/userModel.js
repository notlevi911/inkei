import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['CEO', 'Senior Manager', 'Product Manager'], required: true },
});

export default (conn) => conn.model('User', userSchema);
