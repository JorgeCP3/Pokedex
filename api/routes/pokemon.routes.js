module.exports = app => {
    let router = require("express").Router();
    const controllerPokemon = require("../controllers/pokemon.controller.js");

    router.get("/", controllerPokemon.listPokemon);
    router.get("/:id", controllerPokemon.getPokemonById);
    router.post("/", controllerPokemon.createPokemon);
    router.put("/:id", controllerPokemon.updatePokemonPut);
    router.patch("/:id", controllerPokemon.updatePokemonPatch);
    router.delete("/:id", controllerPokemon.deletePokemon);

    router.post("/:id/img", controllerPokemon.uploadImage);
    router.get("/:id/evolutiva", controllerPokemon.getLineaEvolutiva);

    app.use("/pokemon", router);
};