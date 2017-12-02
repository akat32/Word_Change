var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));
require('./mongo');

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

app.post('/save', async (req,res)=>{
  var new_word = new Words(req.body);
  let result = await new_word.save();
  console.log('new Word! : ' + result.word);
  res.status(200).send('New Word! : ' + result.word + result.change);
})
.post('/find', async (req,res)=>{
  const rquery = new RegExp(req.body.word);
  let result = await Words.find({word : rquery});
  if(!result) return res.status(404).json({message : "Word not find!"});
  else return res.status(200).json(result);
})
.post('/change', async(req,res)=>{
  var result = await Words.find().sort({word : 1});
  var str = req.body.str;
  var ss;
  for(i=0;;i++){
    if(!result[i]) break;
    ss = str.replaceAll(result[i].word,result[i].change);
  }
  console.log(ss);
  res.status(200).send(ss);
})
.post('/chk', async (req,res)=>{
  var result = await Words.find().sort({_id : 1});
  if(result[0] == null) res.status(404).json({message : "DB Have not Words!"});
  else{
   res.status(200).json(result);
   console.log(result);
  }
})
app.listen(3000, ()=>{
  console.log('Server Porting on 3000');
});
