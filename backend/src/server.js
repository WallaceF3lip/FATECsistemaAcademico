import app from "./app.js";

const PORTA = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

app.listen(PORTA, HOST, () => {
  console.log(
    "Servidor Express disponivel em " + 
    `http://localhost:${PORTA}`);
});