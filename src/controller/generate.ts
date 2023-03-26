import { DataBaseSource } from "../config/database";
import {Alerta, Estacao, Parametro, Medida} from "./../models/index";

const alertaRepository = DataBaseSource.getRepository(Alerta)
const estacaoRepository = DataBaseSource.getRepository(Estacao)
const parametroRepository = DataBaseSource.getRepository(Parametro)
const medidaRepository = DataBaseSource.getRepository(Medida)


export const generate = async () => {
    try {
        console.log("Dados gerados com sucesso");

        await parametroRepository
            .createQueryBuilder()
            .insert()
            .into(Parametro)
            .values([
                {
                    nome: 'Parâmetro 1',
                    unidadeDeMedida: 'm/s',
                    fator: 8,
                    offset: 5,
                    formula: '1 + 1 = 2',
                },
                {
                    nome: 'Parâmetro 2',
                    unidadeDeMedida: 'm/s',
                    fator: 10,
                    offset: 10,
                    formula: '2 + 2 = 4',
                },
                {
                    nome: 'Parâmetro 3',
                    unidadeDeMedida: 'm/s',
                    fator: 10,
                    offset: 10,
                    formula: '10',
                },
            
            ])
            .execute()

        parametroRepository
            .createQueryBuilder()
            .update(Parametro)
            .set({
              tipo: "1",
            })
            .where(
              "tipo.id = :tipo_id", {
              tipo_id: 1,
            })
            .execute()

        await medidaRepository
            .createQueryBuilder()
            .insert()
            .into(Medida)
            .values([
                {
                    valorMedido: '10',
                    unixtime: 10,
                },
                {
                    valorMedido: '20',
                    unixtime: 20,
                },
            ])
            .execute()

        await alertaRepository
            .createQueryBuilder()
            .insert()
            .into(Alerta)
            .values([
                {
                    nome: 'Alerta 1',
                    valorMax: 10,
                    valorMinimo: 2,
                    nivel: 1,
                },
                {
                    nome: 'Alerta 2',
                    valorMax: 5,
                    valorMinimo: 1,
                    nivel: 2,
                },

            ])
            .execute()
        
        await estacaoRepository
            .createQueryBuilder()
            .insert()
            .into(Estacao)
            .values([
                {
                    nome: 'Estação 1',
                    uid: '123456',
                    UTC: 'UTC-3',
                    lati: 10,
                    long: 10,
                    unixtime: 10,
                },
                {
                    nome: 'Estação 2',
                    uid: '123',
                    UTC: 'UTC-3',
                    lati: 15,
                    long: 10,
                    unixtime: 1454,
                },
            
            ])
            .execute()      

    } catch (error) {
        console.log("Erro ao gerar dados");
    }
}