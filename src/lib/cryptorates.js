// src/updateCryptoRates.js

import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the schema for the crypto rates
const cryptoRateSchema = new mongoose.Schema({
  name: String,
  rate: Number,
});

// Create a model for the crypto rates
const CryptoRate = mongoose.model('CryptoRate', cryptoRateSchema);

// Function to update crypto rates
const updateCryptoRates = async () => {
  try {
    // Fetch crypto rates from an API (e.g., Coingecko)
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,litecoin',
        vs_currencies: 'usd',
      },
    });

    // Update the crypto rates in the database
    await Promise.all([
      CryptoRate.findOneAndUpdate({ name: 'Bitcoin' }, { rate: response.data.bitcoin.usd }),
      CryptoRate.findOneAndUpdate({ name: 'Ethereum' }, { rate: response.data.ethereum.usd }),
      CryptoRate.findOneAndUpdate({ name: 'Litecoin' }, { rate: response.data.litecoin.usd }),
    ]);

    console.log('Crypto rates updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating crypto rates:', error.message);
  }
};

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Schedule the crypto rates update every 2 minutes
    setInterval(updateCryptoRates, 2 * 60 * 1000);
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

export { updateCryptoRates };
