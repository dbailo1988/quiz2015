/**
 * Created by daniel on 27/06/15.
 */

//Get quizes/question
exports.question = function(req, res){
    res.render('quizes/question', {pregunta: 'Capital de Italia'});
}

exports.answer = function(req, res){
    if (req.query.respuesta === 'Roma'){
        res.render('quizes/answer', {respuesta: 'Correcto'});
    } else {
        res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
}