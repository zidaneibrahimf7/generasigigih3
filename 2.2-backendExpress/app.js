const express = require('express');
const bodyParser = require('body-parser');
const routerSong = require('./routes/routes.js')

require('dotenv').config
const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());

app.use('/api', routerSong);

app.listen(port, () => {
  console.log(`server on the localhost ${port}`)
})


// app.get('/', (req, res) => {
//   res.status(200).send('Hello World!')
// })
