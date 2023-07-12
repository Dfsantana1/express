const express = require("express");
const router = express.Router();
const RegistroController = require("../controllers/registro");

router.post("/register", RegistroController.registrarUsuario);
//ruta para editar usuario admistrador
router.put("/edit", RegistroController.editarUsuario);


module.exports = router;
