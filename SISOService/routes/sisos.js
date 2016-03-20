var express = require('express');
var router = express.Router();

/*
 * GET sisolist.
 */
router.get('/sisolist', function(req, res) {
    var db = req.db;
    var collection = db.get('siso');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * get findsisobymng.
 */
router.get('/findsisolist/:manager', function(req, res) {
    var db = req.db;
    var collection = db.get('siso');
    var userToFind = req.params.manager;
    console.log(userToFind);
    collection.find({manager: userToFind },function(e,docs){
    	console.log('DB FOURND!!!!!!!!!!' + docs);
        res.json(docs);
    });
});



/*
 * POST to sign in.
 */
router.post('/signin', function(req, res) {
    var db = req.db;
    var collection = db.get('siso');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to sign out.
 */
router.delete('/signout/:userpin', function(req, res) {
    var db = req.db;
    var collection = db.get('siso');
    var userToDelete = req.params.userpin;
    collection.remove({ 'userpin' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;