require('dotenv').config();

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/fixmylife';
exports.PORT = process.env.PORT || 8080;
