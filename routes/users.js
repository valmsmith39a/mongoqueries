var express = require('express');
var router = express.Router();
var Person = require('../models/person');

/* GET all users. */
router.get('/', function(req, res, next) {

  console.log('req query: ', req.query); 
  console.log('req query type: ', typeof req.query); 
  console.log('age: ', req.query.age);

  if(req.query.queryaction === 'filter'){
    // age, occupation, name.last
    if(req.query.gender === 'male'){
        Person.find({gender:'male'}).limit(1).exec(function(err, persons){
          console.log(persons); 
          res.send(persons);
        });
    } // if...req.query.gender 
  } // if...

  else {

  // age, occupation, name.last
    Person.find({age:{$lt:28}, gender:'female'}).limit(5).exec(function(err, persons){
      console.log(persons); 
      res.send(persons);
    });
  }




  /*.limit.exec(function(err, persons){
    console.log('persons ', persons);
    res.send(persons)
  });*/
});

/*
// Get one user 
router.get('/:id', function(req, res, next){

});
*/

// Create new user 
router.post('/', function(req, res, next){
  Person.create(req.body, function(err, person){
    if(err) return('Error creating new user '); 
    res.send(person);
  });
  /*
  var person = new Person(req.body);
  person.save(function(err, personData){
    res.send(personData);
  });
  */
}); // .post()

module.exports = router;
