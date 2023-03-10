import { DataBaseSource } from "./config/database";
try {
  DataBaseSource.initialize()
    .then(() => console.log("Banco conectado com sucesso"))
    .catch(({ err }) => {
      console.log(err);
    });
} catch (error) {
  console.log(error);
}
