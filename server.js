const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

connectDB();
// Serve frontend

  app.use(express.static('frontend/build'));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, 'frontend','build', 'index.html')
    )
  );




app.listen(port, () => console.log(`Server started on port ${port}`));
