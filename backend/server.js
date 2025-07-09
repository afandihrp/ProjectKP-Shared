
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
// app.use(cors());

app.get('/hello', (req,res) => {
  res.send('hi!');
})

app.get('/get1', (req,res) => {
  res.status(200).json({status: 'bisa'})
  
})

app.post('/post1', (req,res) => {
  // res.status(200).json({status: 'bisa'})
  const {data, dataDouble} = req.body;
  if(!data && !dataDouble){
    return res.status(400).send({status:'failed'})
  }
  res.status(200).send({status:'success'})
  console.log(data +":"+ dataDouble)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
