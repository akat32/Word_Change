var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));
require('./mongo');


app.post('/save', async (req,res)=>{
  var new_word = new Words(req.body);
  let result = await new_word.save();
  console.log('new Word! : ' + result.word);
  res.status(200).send('New Word! : ' + result.word);
})
.post('/find', async (req,res)=>{
  const rquery = new RegExp(req.body.word);
  let result = await Words.find({word : rquery});
  if(!result) return res.status(404).json({message : "Word not find!"});
  else return res.status(200).json(result);
});

app.listen(3000, ()=>{
  console.log('Server Porting on 3000');
});