const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: String,
    emailid: String,
    phone: String,
    address: String
}, {
    timestamps: true
});
module.exports = mongoose.model('Customers', CustomerSchema);

// module.exports = mongoose.model( 'Adds',CustomerSchema);