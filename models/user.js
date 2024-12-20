const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the user
  email: { type: String, required: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ }, // Email with regex validation
  password: { type: String, required: true }, // Password (hashed)
  resetPasswordCode: { type: String }, // Code for password reset
  resetPasswordCodeExpiration: { type: Date }, // Expiration of reset code
});

// Hash password before saving the user document
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) { // Only hash if password is modified
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password); // Compare input password with hashed password
};

const User = mongoose.model('User', userSchema);

module.exports = User;
