const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const authorRouter = require('./authorRouter');
const booksRouter = require('./booksRouter');
const userRouter = require('./userRouter');
const errorMiddleware = require('../middlewares/error');

app.use('/authors', authorRouter);
app.use('/books', booksRouter);
app.use(errorMiddleware);

app.use('/user', userRouter);


app.listen(port, () => console.log("Example listen on port port!"));