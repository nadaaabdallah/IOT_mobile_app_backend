import { connect, Schema, model } from 'mongoose';
require('dotenv').config();  // Make sure you're loading environment variables

// MongoDB connection URI (you can store this in the .env file for better security)
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/authdb';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

const subscriptionSchema = new Schema({
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
});

const cors = require('cors');
app.use(cors()); // Allows all origins by default


const Subscription = model('Subscription', subscriptionSchema);

export default { Subscription, connectDB };
