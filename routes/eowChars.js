var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/eowDB');

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const client = await dbConnect.connect();
        const result = await client.query('SELECT charid, charname FROM char WHERE userid=1');
        let charList = (result) ? result.rows : null;
        
        //console.log(charList);

        //res.end(JSON.stringify(results));
        res.render('pages/eowChars', { charList } );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;