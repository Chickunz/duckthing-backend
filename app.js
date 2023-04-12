require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// database
const connectDB = require('./db/connect');

//  routers
const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');

app.set('trust proxy', 1);
app.use(cors());

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', itemRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
