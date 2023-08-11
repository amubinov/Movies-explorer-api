require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { MONGO_URL, PORT } = require('./utils/config');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors({
  origin: ['https://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'https://api.amubinov.nomoredomains.xyz',
    'http://api.amubinov.nomoredomains.xyz',
    'https://amubinov.nomoredomains.xyz',
    'http://amubinov.nomoredomains.xyz',
  ],
  credentials: true,
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  optionsSuccessStatus: 204,
}));

app.use(helmet());

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
