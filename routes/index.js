var express = require('express');
var router = express.Router();
var  userModel = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// we cannot use one route data to another route 
// flash messages apko ye allow krte h ki app is route me bane hue data ko dusre route me use kr sako
// setting up flash message route 
router.get('/failed',function(req,res,next){
  req.flash('Done', 5);
  req.flash('Name', 'raj');
  res.send('flash created');

})

// checking flash data
router.get('/checking',function(req,res,next){
  console.log(req.flash('Done'), req.flash('Name'));
  res.send('Check your console');
})


// solving mongodb questions
router.get('/create',async function(req,res,next){
  const users = await userModel.create({
    username: 'devraj shrivastava',
    nickname: 'dev',
    desc: 'over powered OP',
    categoreis: ['node.js','GShock', 'React.next.js','JS']
  })
  res.send(users)
})

router.get('/allusers',async function(req,res,next){
  const users = await userModel.find()
  res.send(users)
})

// using regexp to find users using case insensetive capital small letters wont matter
router.get('/find',async function(req,res,next){
  var regex = new RegExp('^devraj shrivastava$','i');
  let user = await userModel.find({username : regex});
  res.send(user);
})

// searching on the basis off specific details
router.get('/find2',async function(req,res,next){
  let user = await userModel.find({categoreis: {$all: ['JS']}});
  res.send(user);
})

// specific date range 
router.get('/date',async function(req,res,next){
  var date1 = new Date('2024-03-22');
  var date2 = new Date('2024-03-26');
  let userdate = await userModel.find({datecreated: {$gte: date1, $lte: date2}});
  res.send(userdate);
})


// filter everyone on thr basis of fields matalab bande ke pass vo field h ya ni h
router.get('/field',async function(req,res,next){
  let user = await userModel.find({categoreis: {$exists: true}});
  res.send(user);
})

// specific field length 
router.get('/fieldlength',async function(req,res,next){
  let user = await userModel.find({
    $expr:{
      $and: [
        {$gte: [{$strLenCP: '$nickname'},0]},
        {$lte: [{$strLenCP: '$nickname'},12]}
      ]
    }
  });
  res.send(user);
})

module.exports = router; 