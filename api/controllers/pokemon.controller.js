const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listPokemon = async (req, res) => {
    try {
        const pokemons = await db.pokemon.findAll({ order: [["nroPokedex", "ASC"]] });
        res.json(pokemons);
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener los pokemons",
        });
    }
}

exports.getPokemonById = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await db.pokemon.findByPk(id);
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createPokemon = async (req, res) => {
    const requiredFields = ["nombre", "nroPokedex", "idHabilidad1", "idHabilidad2", "idTipo1", "descripcion", "ps", "ataque", "defensa", "ataqueEspecial", "defensaEspecial", "velocidad", "nivelEvolucion"];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const pokemon = {
            nombre: req.body.nombre,
            nroPokedex: req.body.nroPokedex,
            idHabilidad1: req.body.idHabilidad1,
            idHabilidad2: req.body.idHabilidad2,
            idHabilidad3: req.body.idHabilidad3,
            idTipo1: req.body.idTipo1,
            idTipo2: req.body.idTipo2,
            descripcion: req.body.descripcion,
            ps: req.body.ps,
            ataque: req.body.ataque,
            defensa: req.body.defensa,
            ataqueEspecial: req.body.ataqueEspecial,
            defensaEspecial: req.body.defensaEspecial,
            velocidad: req.body.velocidad,
            nivelEvolucion: req.body.nivelEvolucion,
            idEvPrevia: req.body.idEvPrevia,
            idEvSiguiente: req.body.idEvSiguiente
        };
        const newPokemon = await db.pokemon.create(pokemon);
        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(500).send({
            message: "Error al crear el pokemon",
        });
    }
}

exports.updatePokemonPut = async (req, res) => {
    try{
        const id = req.params.id;
        const pokemon = {
            nombre: req.body.nombre,
            nroPokedex: req.body.nroPokedex,
            idHabilidad1: req.body.idHabilidad1,
            idHabilidad2: req.body.idHabilidad2,
            idHabilidad3: req.body.idHabilidad3,
            idTipo1: req.body.idTipo1,
            idTipo2: req.body.idTipo2,
            descripcion: req.body.descripcion,
            ps: req.body.ps,
            ataque: req.body.ataque,
            defensa: req.body.defensa,
            ataqueEspecial: req.body.ataqueEspecial,
            defensaEspecial: req.body.defensaEspecial,
            velocidad: req.body.velocidad,
            nivelEvolucion: req.body.nivelEvolucion,
            idEvPrevia: req.body.idEvPrevia,
            idEvSiguiente: req.body.idEvSiguiente
        }
        const pokemonUpdated = await db.pokemon.update(pokemon, {
            where: {id: id}
        });
        if (pokemonUpdated == 1) {
            res.json({ message: "Pokemon actualizado" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.updatePokemonPatch = async (req, res) => {
    try{
        const id = req.params.id;
        const result = await db.pokemon.update(req.body, {
            where: {id: id}
        });
        if (result == 1) {
            res.json({ message: "Pokemon actualizado" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.deletePokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.pokemon.destroy({
            where: {id: id}
        });
        if (result == 1) {
            res.json({ message: "Pokemon eliminado" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.uploadImage = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await db.pokemon.findByPk(id);
        if (!db.pokemon) {
            return res.status(404).send({ message: "Pokemon no encontrado" });
        }
        if (!req.files || !req.files.image) {
            return res.status(400).send({ message: "Debe subir una imagen" });
        }

        const file = req.files.image;
        const fileName = `${pokemon.id}.png`;
        file.mv(`public/images/pokemones/${fileName}`, (err) => {
            if (err) {
                return res.status(500).send({ message: "Error al guardar la imagen" });
            }
            res.json({ success: true, message: "Imagen subida correctamente", pokemon: pokemon });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
};

exports.getLineaEvolutiva = async (req, res) => {
    const idPokemonActual = req.params.id; 
    try {
        let pkmon = await db.pokemon.findByPk(idPokemonActual);
        const respuesta = [];

        // Caso 0: No tiene evolución
        if (pkmon.idEvPrevia === null && pkmon.idEvSiguiente === null) {
            return res.json([{ id: idPokemonActual, nombre: pkmon.nombre, nivelEvolucion: pkmon.nivelEvolucion }]); 
        }

        // Agregar el Pokémon actual primero
        respuesta.push({ id: idPokemonActual, nombre: pkmon.nombre, nivelEvolucion: pkmon.nivelEvolucion });

        // Caso 1: Pokémon inicial es el actual
        if (pkmon.idEvPrevia === null) {
            while (pkmon.idEvSiguiente !== null) {
                pkmon = await db.pokemon.findByPk(pkmon.idEvSiguiente);
                respuesta.push({ id: pkmon.id, nombre: pkmon.nombre, nivelEvolucion: pkmon.nivelEvolucion }); 
            }
            return res.json(respuesta);
        }

        // Caso 2: Pokémon final es el actual
        if (pkmon.idEvSiguiente === null) {
            while (pkmon.idEvPrevia !== null) {
                pkmon = await db.pokemon.findByPk(pkmon.idEvPrevia);
                respuesta.unshift({ id: pkmon.id, nombre: pkmon.nombre, nivelEvolucion: pkmon.nivelEvolucion }); 
            }
            return res.json(respuesta);
        }

        // Caso 3: Pokémon intermedio
        while (pkmon.idEvPrevia !== null) {
            pkmon = await db.pokemon.findByPk(pkmon.idEvPrevia);
            respuesta.unshift({ id: pkmon.id, nombre: pkmon.nombre, nivelEvolucion: pkmon.nivelEvolucion }); 
        }

        pkmon = await db.pokemon.findByPk(idPokemonActual); 
        while (pkmon.idEvSiguiente !== null) {
            pkmon = await db.pokemon.findByPk(pkmon.idEvSiguiente);
            respuesta.push({ id: pkmon.id, nombre: pkmon.nombre, nivelEvolucion: pkmon.nivelEvolucion }); 
        }

        return res.json(respuesta);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener la línea evolutiva" });
    }
};


