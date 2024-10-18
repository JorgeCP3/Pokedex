module.exports = app => {
    let router = require("express").Router();
    const controllerTipo = require("../controllers/tipo.controller.js");

    router.get("/", controllerTipo.listTipo);
    router.get("/:id", controllerTipo.getTipoById);
    router.post("/", controllerTipo.createTipo);
    router.put("/:id", controllerTipo.updateTipo);
    router.delete("/:id", controllerTipo.deleteTipo);

    router.post("/:id/img", controllerTipo.uploadImage);

    app.use("/tipo", router);
};