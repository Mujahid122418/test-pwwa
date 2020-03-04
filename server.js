const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
var morgan = require('morgan')
// Bodyparser Middleware
app.use(express.json());

app.use(morgan("dev"));
// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('pwa/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//app.use(express.static('./pwa/build'));
const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
