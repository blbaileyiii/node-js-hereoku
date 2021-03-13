var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/eowDB');

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const client = await dbConnect.connect();
        const result = await client.query('SELECT * FROM char');
        const results = { 'results': (result) ? result.rows : null};
        res.end(JSON.stringify(results));
        //res.render('pages/eowdb', results );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;