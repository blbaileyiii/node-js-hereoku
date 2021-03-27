var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/eowDB');

// Needed for post... 
// extended can be true or false...depends on if you need json style data
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* GET home page. */
router.post('/', async (req, res) => {
    try {

        let charid = req.body.charid;
        let locid = req.body.locid;

        //console.log(req);
        //console.log(req.body);
        //console.log(charid);
        //console.log(locid);

        const client = await dbConnect.connect();
        const result = await client.query('UPDATE char SET locationid='+locid+' WHERE charid='+charid+';');
        //UPDATE char SET locationid='+locid+' WHERE charid='+charid+';
        const results = { 'results': (result) ? result.rows : null};
        res.end(JSON.stringify(results));
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;