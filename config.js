require('dotenv').config();

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/testfixmylife';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/fixmylife';
exports.PORT = process.env.PORT || 8080;