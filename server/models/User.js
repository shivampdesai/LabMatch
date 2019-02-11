const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  studentYear: {
    type: String,
    default: ''
  },
  studentClassTaken: {
    type: String,
    default: ''
  },
  studentMajor: {
    type: String,
    default: ''
  },
  studentDepartmentOfInterest: {
    type: String,
    default: ''
  },
  professorLabSnippet: {
    type: String,
    default: ''
  },
  professorYearsLookingFor: {
    type: String,
    default: ''
  },
  professorClassesNeeded: {
    type: String,
    default: ''
  },
  professorDepartment: {
    type: String,
    default: ''
  },
  professorMajors: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('User', UserSchema);
