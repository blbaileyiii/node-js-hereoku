var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/herokuDB');
var id = 1;
var sql = 'SELECT p1."firstName" as "pFName", p1."lastName" as "pLName", p2."firstName" as "cFName", p2."lastName" as "cLName" FROM person as p1 JOIN "familyTree" ON "familyTree"."parentId" = p1."personId" JOIN person as p2 ON "familyTree"."childId" = p2."personId"';

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const client = await dbConnect.connect();
        const result = await client.query(sql);
        const results = { 'results': (result) ? result.rows : null};
        //res.render('pages/getPerson', results );
        res.end(JSON.stringify(results));
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;