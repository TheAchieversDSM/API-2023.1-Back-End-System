import { Estacao } from "../models";



export default class TesteEstacao {
    static giveMeaValidStation(): Estacao{
        const estacao = new Estacao();
        estacao.nome = "estacao_teste";
        estacao.lati = 123456;
        estacao.long = 223467706;
        estacao.unixtime = 223578817;
        estacao.ativo = 1;
        return estacao;
    }
}