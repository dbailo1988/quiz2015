/**
 * Created by daniel on 27/06/15.
 */
var models = require('../models/models.js');


exports.load = function(req, res, next, quizId){
    models.Quiz.find(quizId).then(function(quiz){
        if (quiz){
            req.quiz = quiz;
            next();
        } else {
            next(new Error('no existe quizId = ' + quizId));
        }
    })
};

//Get /quizes
exports.index = function(req,res){
    models.Quiz.findAll().then(function(quizes){
       console.log(quizes);
       res.render('quizes/index', {quizes: quizes});
    }).catch(function(error){next(error);});
};

//Get /quizes/:quizId
exports.show = function(req, res){
    res.render('quizes/show', {quiz: req.quiz});
};

//Get /quizes/:quizId/answer
exports.answer = function(req, res){
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};