import { Parametro} from "../models";

export default class TesteParametro {
    static giveMeaValidParameter(): Parametro{
        const parametro = new Parametro();
        parametro.nome = "parametro_teste";
        parametro.fator = 123456;
        parametro.offset = 223467706;
        parametro.ativo = 1;
        return parametro;
    }
}