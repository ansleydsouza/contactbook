const mongoose = require('mongoose');

const ContactSchema= new mongoose.Schema({
    contact_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);