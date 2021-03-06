var express = require('express');
var router = express.Router();
var pg = require('pg');

var quizController = require('../controllers/quiz_controller');

router.get('/db', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.render('', {results: result.rows, errors: []} ); }
        });
    });
})

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/* GET home page. */
router.get('/author', function(req, res) {
    res.render('author', { title: 'Author', errors: [] });
});

//Autoload para comandos con quizId
router.param('quizId', quizController.load); //autoload

router.get('/quizes',                       quizController.index)
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   quizController.new);
router.post('/quizes/create',               quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    quizController.edit);
router.put('/quizes/:quizId(\\d+)',         quizController.update);
router.delete('/quizes/:quizId(\\d+)',      quizController.delete);

module.exports = router;
