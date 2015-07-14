/**
 * Created by daniel on 14/07/15.
 */
var path = require('path');

var Sequelize = require('sequelize');

//Cargar modelo ORM
var sequelize = new Sequelize(null, null, null,
    {dialect: "sqlite", storage: "quiz.sqlite"}
);

//Importar la deficion de quiz en models
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Exportar Quiz
exports.Quiz = Quiz;

//Crea e inicia tabla de preguntas en DB
sequelize.sync().success(function() {
    Quiz.count().success(function (count) {
            if (count === 0) {
                Quiz.create({
                    pregunta: "Capital de Italia",
                    respuesta: "Roma"
                }).success(function () {
                    console.log("Base de datos inicializada");
                });
            }
        }
    );
});