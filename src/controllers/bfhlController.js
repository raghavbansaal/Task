import Joi from 'joi';
import { getFibonacci, filterPrimes, calculateLCM, calculateHCF } from '../utils/mathUtils.js';
import { getAIAnswer } from '../utils/aiUtils.js';
import { config } from '../config/env.js';
const requestSchema = Joi.object({
  fibonacci: Joi.number().integer().min(0),
  prime: Joi.array().items(Joi.number().integer()),
  lcm: Joi.array().items(Joi.number().integer()),
  hcf: Joi.array().items(Joi.number().integer()),
  AI: Joi.string().trim().min(1)
}).xor('fibonacci', 'prime', 'lcm', 'hcf', 'AI')
  .unknown(false);

export const bfhlPost = async (req, res) => {
  const { error, value } = requestSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      is_success: false,
      official_email: config.officialEmail,
      error: error.details.map(detail => detail.message).join('; ')
    });
  }

  const key = Object.keys(value)[0];
  const inputValue = value[key];

  try {
    let outputData;
    switch (key) {
      case 'fibonacci':
        outputData = getFibonacci(inputValue);
        break;
      case 'prime':
        outputData = filterPrimes(inputValue);
        break;
      case 'lcm':
        outputData = calculateLCM(inputValue);
        break;
      case 'hcf':
        outputData = calculateHCF(inputValue);
        break;
      case 'AI':
        outputData = await getAIAnswer(inputValue);
        break;
      default:
        throw new Error('Unexpected key');
    }

    return res.status(200).json({
      is_success: true,
      official_email: config.officialEmail,
      data: outputData
    });
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      official_email: config.officialEmail,
      error: err.message || 'Internal error'
    });
  }
};