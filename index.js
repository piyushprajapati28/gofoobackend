const express = require('express');
const connectDb = require('./db');
const cors = require('cors');  
const router = require('./Routes/orderData');
const app = express();
const port = process.env.PORT || 3300;

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017';

app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());

connectDb(DATABASE_URL)
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });


app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.use('/api', require('./Routes/createUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/orderData'));




app.get('/about', (req, res) => {
  res.send('About the API');
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
