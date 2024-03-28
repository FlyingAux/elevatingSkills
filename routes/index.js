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


module.exports = router;