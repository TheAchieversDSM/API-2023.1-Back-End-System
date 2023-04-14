import { Router } from "express";
import { EstacaoController } from "../controller";
import { auth } from "../middleware/auth";
const estacao = Router();

estacao.get("/pegarEstacoes/", EstacaoController.getAllEstacao);
estacao.get("/pegarEstacoesPorId/:id", EstacaoController.getEstacaoById);
estacao.get(
  "/pegarEstacoesRelacoes/:id",
  EstacaoController.pegarEstacoesRelacoes
);
estacao.get(
  "/pegarMedidaEstacaoParametro/:idEstacao",
  EstacaoController.getEstacaoParametro
);
estacao.use(auth);
estacao.post("/cadastro", EstacaoController.postEstacao);

export default estacao;
