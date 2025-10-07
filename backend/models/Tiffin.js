import mongoose from 'mongoose';

const tiffinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetarian', 'non-vegetarian', 'jain', 'eggetarian']
  },
  image: {
    type: String,
    default: ''
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Tiffin = mongoose.model('Tiffin', tiffinSchema);

export default Tiffin;