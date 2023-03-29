import { Router } from "express";
import { EstacaoController } from "../controller";

const estacao = Router();

estacao.post("/cadastro", EstacaoController.postEstacao);
estacao.get("/pegarEstacoes/", EstacaoController.getAllEstacao);
estacao.get("/pegarEstacoesPorId/:id", EstacaoController.getEstacaoById);
estacao.get("/pegarEstacoesRelacoes/:id", EstacaoController.pegarEstacaoRelacao);
estacao.get("/pegarEstacoesRelacoes/:idEstacao/:idParametro", EstacaoController.PegarMedidasComParametroEstacao);

export default estacao;
