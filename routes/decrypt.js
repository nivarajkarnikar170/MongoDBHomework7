var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes256', 'asaadsaad');


/* GET users listing. */
router.get('/', function(req, res, next) {
   let decrypted;
  MongoClient.connect('mongodb://127.0.0.1:27017/myDb', function(err, db){
    if(err) throw err;
    db.collection('homework7').findOne({}, function(err, doc){
      if(err) throw err;
      // console.dir(doc);
      // console.log(doc.message);                                                      
      decrypted = decipher.update(doc.message, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      console.log(decrypted);   
      db.close();
      res.send(decrypted);
    });
  });
  // res.send('Decryption Completed!!');
});

module.exports = router;
