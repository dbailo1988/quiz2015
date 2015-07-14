/**
 * Created by daniel on 14/07/15.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz',
        {   pregunta: DataTypes.STRING,
            respuesta: DataTypes.STRING
        }
    );
}