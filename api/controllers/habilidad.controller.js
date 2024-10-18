const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listHabilidad = async (req, res) => {
    try {
        const habilidades = await db.habilidad.findAll();
        res.json(habilidades);
    } catch (error) {
        res.status(500).send();
    }
}

exports.getHabilidadById = async (req, res) => {
    try {
        const id = req.params.id;
        const habilidad = await db.habilidad.findByPk(id);
        if (habilidad) {
            res.json(habilidad);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
}

exports.createHabilidad = async (req, res) => {
    const requiredFields = ["nombre"];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const habilidad = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        };
        const newHabilidad = await db.habilidad.create(habilidad);
        res.status(201).json(newHabilidad);
    } catch (error) {
        res.status(500).send();
    }
}

exports.updateHabilidadPut = async (req, res) => {
    try {
        const id = req.params.id;
        const habilidad = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }
        const habilidadUpdated = await db.habilidad.update(habilidad, {
            where: { id: id }
        });
        if (habilidadUpdated == 1) {
            res.json({ message: "Habilidad actualizada" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
}

exports.updateHabilidadPatch = async (req, res) => {
    try {
        const id = req.params.id;
        const habilidad = await db.habilidad.update(req.body, {
            where: { id: id }
        });
        if (habilidad == 1) {
            res.json({ message: "Habilidad actualizada" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
}

exports.deleteHabilidad = async (req, res) => {
    try {
        const id = req.params.id;
        const habilidad = await db.habilidad.findByPk(id);
        if (habilidad) {
            await habilidad.destroy();
            res.json(habilidad);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
}