const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const authRoutes = require('./modules/auth/auth.routes');
const errorMiddleware = require('./middleware/error.middleware');
const authorBlogRoutes = require('./modules/blog/routes/author.routes');




const app = express();





app.use(
    '/uploads',
    express.static(
      path.join(__dirname, '../public/uploads')
    )
  );

app.use(
    express.urlencoded({
      extended: true,
    })
  );


// serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));



app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/author',authorBlogRoutes);






app.use(errorMiddleware);

module.exports = app;