import { Router } from "express";
import { EstacaoController } from "../controller";

const estacao = Router();

estacao.get("/estacoes/", EstacaoController.getAllEstacao);
estacao.get("/estacoes/:id", EstacaoController.getEstacaoById);
estacao.post("/cadastro", EstacaoController.postEstacao);

export default estacao;
