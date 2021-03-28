var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/eowDB');

/* GET home page. */
router
    .get('/', async (req, res) => {
    try {

        let locid;
        let charid = req.query.charid;

        let client = await dbConnect.connect();

        //Nav List
        let sqlStr = 'SELECT charid, charname, locationid FROM char WHERE userid=1 ORDER BY charname';
        let result = await client.query(sqlStr);
        let charList = (result) ? result.rows : null;
        console.log(charList);

        //Char Id info
        sqlStr = 'SELECT charid, charname, locationid FROM char WHERE charid =' + charid;
        result = await client.query(sqlStr);
        let character = (result) ? result.rows : null;
        console.log(character);

        if(character){
            locid = character[0].locationid;
        }

        if (locid == "null") {locid = getRandomInt(5);}
        console.log(locid);

        sqlStr = 'SELECT l1.locname AS pname, l1.locdesc AS pdesc, l1.dom_heritage AS pheritage, l1.rank AS prank, l1.type AS ptype, l2.locid AS cid, l2.locname AS cname, l2.locdesc AS cdesc, l2.dom_heritage AS cheritage, l2.rank AS crank, l2.type AS ctype, lh.status FROM locations as l1 JOIN locationhub as lh ON lh.parentid = l1.locid JOIN locations as l2 ON lh.childid = l2.locid WHERE l1.locid=' + locid + ' ORDER BY l1.locname, l2.locname;';
        result = await client.query(sqlStr);
        let locs = (result) ? result.rows : null;        
        console.log(locs);

        //res.end(JSON.stringify(results));
        res.render('pages/eowChar', { charList, character, locs });
        
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
}

module.exports = router;