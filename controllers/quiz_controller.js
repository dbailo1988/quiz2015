/**
 * Created by daniel on 27/06/15.
 */
var models = require('../models/models.js');


//Get quizes
exports.index = function(req,res){
    models.Quiz.findAll().then(function(quizes){
       console.log(quizes);
       res.render('quizes/index', {quizes: quizes});
    });
};

//Get quizes/:quizId
exports.show = function(req, res){
    models.Quiz.find(req.params.id).then(function(quiz) {
        res.render('quizes/show', {pregunta: quiz});
    });
};

//Get quizes/:quizId/answer
exports.answer = function(req, res){
    models.Quiz.find(req.params.id).then(function(quiz){
        if (req.query.respuesta === quiz.respuesta){
            res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
        } else {
            res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
        }
    });
};