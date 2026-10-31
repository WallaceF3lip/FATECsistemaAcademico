import express from "express";
import AlunoController from "../controller/aluno-controller.js";

const router = express.Router();

router.get("/", AlunoController.listar);

router.post("/", AlunoController.cadastrar);

export default router;
