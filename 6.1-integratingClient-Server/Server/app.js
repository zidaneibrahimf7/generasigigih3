const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5001;

const app = express();

app.use(cors()).options('*', cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  const result = [
    {
      id: 1,
      greeting: "Hello World!",
      name: "Zidane"
    }
  ]
  res.json(result)
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})

