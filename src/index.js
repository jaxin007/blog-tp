const express = require('express');
require('express-async-errors')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((err, request, response, next) => {
  console.error(err);
  response.status(500).json({ errorMessage: err.message });
  return next();
});

app.get('/home', (req, res) => {
  res.json('Hello!').status(200)
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
