const express = require("express");
const router = express.Router();
const RegistroController = require("../controllers/registro");

router.post("/register", RegistroController.registrarUsuario);

module.exports = router;
