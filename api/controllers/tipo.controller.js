const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listTipo = async (req, res) => {
    try {
        const tipos = await db.tipo.findAll();
        res.json(tipos);
    } catch (error) {
        res.status(500).send();
    }
}

exports.getTipoById = async (req, res) => {
    try {
        const id = req.params.id;
        const tipo = await db.tipo.findByPk(id);
        if (tipo) {
            res.json(tipo);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
}

exports.createTipo = async (req, res) => {
    const requiredFields = ["nombre"];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const tipo = {
            nombre: req.body.nombre
        };
        const newTipo = await db.tipo.create(tipo);
        res.status(201).json(newTipo);
    } catch (error) {
        res.status(500).send();
    }
}

exports.updateTipo = async (req, res) => {
    const requiredFields = ["nombre"];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const id = req.params.id;
        const tipo = await db.tipo.findByPk(id);
        if (tipo) {
            tipo.nombre = req.body.nombre;
            await tipo.save();
            res.json(tipo);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
}

exports.deleteTipo = async (req, res) => {
    try {
        const id = req.params.id;
        const tipo = await db.tipo.findByPk(id);
        if (tipo) {
            await tipo.destroy();
            res.json(tipo);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
}

exports.uploadImage = async (req, res) => {
    try {
        const id = req.params.id;
        const tipo = await db.tipo.findByPk(id);
        if (!tipo) {
            return res.status(404).send({ message: "Tipo no encontrado" });
        }
        if (!req.files || !req.files.image) {
            return res.status(400).send({ message: "Debe subir una imagen" });
        }

        const file = req.files.image;
        const fileName = `${tipo.id}.png`;
        file.mv(`public/images/tipos/${fileName}`, (err) => {
            if (err) {
                return res.status(500).send({ message: "Error al guardar la imagen" });
            }
            res.json({ success: true, message: "Imagen subida correctamente", tipo: tipo });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
};
