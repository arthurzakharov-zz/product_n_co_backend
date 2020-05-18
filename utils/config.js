// Define config module
const config = {};

config.PORT = process.env.PORT || 3006;

// global mode will keep local running app to be connected to Atlas DB Server
config.DB_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_DB_URI
    : process.env.NODE_ENV === 'global'
    ? ''
    : '';

// Export config module
module.exports = config;
