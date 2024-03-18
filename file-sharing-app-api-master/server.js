const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const connectDB = require('./config/db');

// Cors 
const corsOptions = {
  origin: ['http://127.0.0.1:5500']
};

app.use(cors(corsOptions));
app.use(express.static('public'));

connectDB();

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
