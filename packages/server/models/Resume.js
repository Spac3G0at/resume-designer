// Import dependencies
const mongoose = require('mongoose');

// Define the Resume Schema
const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  fullname: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  email: { type: String },
  address: { type: String },
  phone: { type: String },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String }
  },
  languages: [
    {
      name: { type: String },
      level: { type: String }
    }
  ],
  hobbies: [String],
  title: { type: String, required: true },
  description: { type: String },
  main: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  settings: {
    theme: { type: String, default: 'light' },
    font: { type: String, default: 'Lato' },
    fontSize: { type: String, default: 'normal' },
    resume_title_color: { type: String },
    company_color: { type: String },
    title_color: { type: String },
    name_color: { type: String },
    timeline: { type: Boolean, default: true },
    template: { type: String, default: 'default' },
    resume_scale_factor: { type: Number, default: 1 },
    resume_title_scale_factor: { type: Number, default: 1 }
  },
  private: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
}, { timestamps: true });

// Export the Resume Model
module.exports = mongoose.model('Resume', ResumeSchema);
