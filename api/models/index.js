const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Inicializar Sequelize con la configuración de la base de datos
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar los modelos
db.pokemon = require("./pokemon.model.js")(sequelize, Sequelize);
db.tipo = require("./tipo.model.js")(sequelize, Sequelize);
db.habilidad = require("./habilidad.model.js")(sequelize, Sequelize);

// Definir las relaciones entre los modelos

// pokemon as many tipos
db.tipo.hasMany(db.pokemon, { as: "pokemonTipo1", foreignKey: "idTipo1" });
db.tipo.hasMany(db.pokemon, { as: "pokemonTipo2", foreignKey: "idTipo2" });

db.pokemon.belongsTo(db.tipo, { as: "tipo1", foreignKey: "idTipo1" });
db.pokemon.belongsTo(db.tipo, { as: "tipo2", foreignKey: "idTipo2" });
// pokemon as many habilidades

db.habilidad.hasMany(db.pokemon, { as: "pokemonHabilidad1", foreignKey: "idHabilidad1" });
db.habilidad.hasMany(db.pokemon, { as: "pokemonHabilidad2", foreignKey: "idHabilidad2" });
db.habilidad.hasMany(db.pokemon, { as: "pokemonHabilidad3", foreignKey: "idHabilidad3" });


db.pokemon.belongsTo(db.habilidad, { as: "habilidad1", foreignKey: "idHabilidad1" });
db.pokemon.belongsTo(db.habilidad, { as: "habilidad2", foreignKey: "idHabilidad2" });
db.pokemon.belongsTo(db.habilidad, { as: "habilidad3", foreignKey: "idHabilidad3" });

// relacion de evolucion entre pokemon
db.pokemon.belongsTo(db.pokemon, { as: "evolucionPrevia", foreignKey: "idEvPrevia" });
db.pokemon.belongsTo(db.pokemon, { as: "evolucionSiguiente", foreignKey: "idEvSiguiente" });

module.exports = db;
