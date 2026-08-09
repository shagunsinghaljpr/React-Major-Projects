const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, default: 'General' },
  image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
