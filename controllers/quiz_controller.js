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

//GET /quizes
exports.index = function(req,res){
    var search = '%';

    if (req.query.search){
        search += req.query.search.replace(/ /g,"%") + '%';
    }

    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes){
       console.log(quizes);
       res.render('quizes/index', {quizes: quizes, errors: []});
    }).catch(function(error){next(error);});
};

//GET /quizes/new
exports.new = function(req, res){
    var quiz = models.Quiz.build(//crea objeto quiz
        { pregunta: "pregunta", respuesta: "respuesta", tema: "otro"}
    );

    res.render('quizes/new', {quiz: quiz, errors: []});
};


//POST /quizes/create
exports.create = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);

  quiz
  .validate()
  .then(
    function(err){
        if (err){
            res.render('quizes/new', {quiz: quiz, errors: err.errors});
        } else {
            quiz
            .save({fields: ["pregunta", "respuesta", "tema"]})
            .then(function(){
                res.redirect('/quizes')
            });
        }
    });
};


//GET /quizes/:quizId
exports.show = function(req, res){
    res.render('quizes/show', {quiz: req.quiz, errors: []});
};

//GET /quizes/:quizId/answer
exports.answer = function(req, res){
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

//GET /quizes/:quizId/edit
exports.edit = function(req, res){
    var quiz = req.quiz;

    res.render('quizes/edit', {quiz: quiz, errors: []});
};

//PUT /quizes/:quizId
exports.update = function(req, res) {
    req.quiz.pregunta  = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;

    req.quiz
        .validate()
        .then(
        function(err){
            if (err) {
                res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
            } else {
                req.quiz     // save: guarda campos pregunta y respuesta en DB
                    .save( {fields: ["pregunta", "respuesta", "tema"]})
                    .then( function(){ res.redirect('/quizes');});
            }     // Redirección HTTP a lista de preguntas (URL relativo)
        }
    ).catch(function(error){next(error)});
};

//DELETE /quizes/:quizId
exports.delete = function(req,res){
    req.quiz.destroy().then(function(){
        res.redirect('/quizes');
    }).catch(function(error){next(error)});
};