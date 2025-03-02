const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://InterProject:T5r8e3KddO8LUqyX@cluster0.vc8rwmr.mongodb.net/paytm', {
    w: "majority",  // Write concern
    wtimeoutMS: 5000  // Optional write concern timeout in milliseconds
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));
  
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    balance: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);
module.exports = {User, Account};