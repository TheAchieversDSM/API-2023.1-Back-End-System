import { Router } from "express";
import { EstacaoController } from "../controller";

const estacao = Router();

estacao.post("/cadastro", EstacaoController.postEstacao);
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

estacao.put("/atualizarEstacao/:id", EstacaoController.atualizarEstacaoById);

export default estacao;
