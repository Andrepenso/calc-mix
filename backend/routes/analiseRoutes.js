const express = require("express");
const router = express.Router();
const {
  salvarAnalise,
  listarAnalises,
  atualizarStatusAtendimento
} = require("../controllers/analiseController");

router.post("/", salvarAnalise);
router.get("/", listarAnalises);
router.patch("/:id/atendido", atualizarStatusAtendimento); 

module.exports = router;
