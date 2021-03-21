var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/eowDB');

/* GET home page. */
router.get('/', async (req, res) => {
    try {

        let locid = req.query.locid;

        const client = await dbConnect.connect();
        const result = await client.query('SELECT l1.locname AS pname, l1.locdesc AS pdesc, l1.dom_heritage AS pheritage, l1.rank AS prank, l1.type AS ptype, l2.locid AS cid, l2.locname AS cname, l2.locdesc AS cdesc, l2.dom_heritage AS cheritage, l2.rank AS crank, l2.type AS ctype, lh.status FROM locations as l1 JOIN locationhub as lh ON lh.parentid = l1.locid JOIN locations as l2 ON lh.childid = l2.locid WHERE l1.locid=' + locid + ' ORDER BY l1.locname, l2.locname;');
        const results = { 'results': (result) ? result.rows : null};
        res.end(JSON.stringify(results));
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;