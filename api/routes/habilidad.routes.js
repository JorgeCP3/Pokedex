module.exports = app => {
    let router = require("express").Router();
    const controllerHabilidad = require("../controllers/habilidad.controller.js");

    router.get("/", controllerHabilidad.listHabilidad);
    router.get("/:id", controllerHabilidad.getHabilidadById);
    router.post("/", controllerHabilidad.createHabilidad);
    router.put("/:id", controllerHabilidad.updateHabilidadPut);
    router.patch("/:id", controllerHabilidad.updateHabilidadPatch);
    router.delete("/:id", controllerHabilidad.deleteHabilidad);

    app.use("/habilidad", router);
};