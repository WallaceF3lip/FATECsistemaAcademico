import express from "express";
import cors from "cors";
import alunoRouters from "./routes/aluno-routes.js";

const app = express();

app.use(
  cors({
    origin: "*",

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    mensagem: "Servidor Express funcionando!",
  });
});

app.use("/api/alunos", alunoRouters);

app.use((req, res) => {
  return res.status(404).json({
    sucesso: false,
    mensagem: "Rota não encontrada",
  });
});

app.use((erro, req, res, next) => {
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({
      sucesso: false,
      mensagem: "O corpo da requisição contém JSON inválido.",
    });
  }

  console.error("Erro interno do servidor: ", erro);

  return res.status(500).json({
    sucesso: false,
    mensagem: "Ocorreu um erro interno no servidor.",
  });
});

export default app;
