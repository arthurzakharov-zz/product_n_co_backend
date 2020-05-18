const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { PORT, DB_URI } = require('./utils/config');
const helpers = require('./utils/helpers');

// Initialize Express Application
const app = express();

// Add different useful middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// Define routes
const router = {
  product: require('./routes/Product'),
  notFound: require('./routes/404'),
};
app.use('/product', router.product);
app.use(router.notFound);

console.log(DB_URI);

// Connect to MongoDB and start App
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App is connected to MongoDB');
    // Start App
    app.listen(PORT, () =>
      console.log(
        `App is running in ${process.env.NODE_ENV}mode on port ${PORT}`
      )
    );
  })
  .catch((err) => {
    console.error('Error on DB connection: ', err);
  });
