const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 40 },
  email: { type: String, required: true, minlength: 3, maxlength: 100 },
  password: { type: String, required: true, minlength: 6, maxlength: 200 },
  createAt: { type: Date, default: Date.now },
  admin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);
