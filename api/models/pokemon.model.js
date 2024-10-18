module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nroPokedex: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        idHabilidad1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        idHabilidad2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        idHabilidad3: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        idTipo1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        idTipo2: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        descripcion: {
            type: Sequelize.TEXT, 
            allowNull: false,
        },
        ps: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ataque: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        defensa: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ataqueEspecial: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        defensaEspecial: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        velocidad: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nivelEvolucion: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        idEvPrevia: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        idEvSiguiente: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });
    return Pokemon;
}