export interface Dados {
  _medida: string;
  _nomeParametro: string;
  _unixtime: number;
}

export interface ReturnValuesAlertas {
  offset_parametro: number;
  nome_parametro: string;
  fator_parametro: number;
  id_parametro: number;
  nome_alerta: string;
  nivel: number;
  max: number;
  min: number;
  id: number;
}
export interface ReturnValuesEstacao {
  uid: string;
  id: number;
  nome: string;
}

export interface IAlertas {
  alerta_id: number;
  nome: string;
  valorMax: number;
  valorMinimo: number;
  nivel: number;
  parametro: {
    parametro_id: number;
    nome: string;
    formula: string;
    fator: number;
    offset: number;
  };
}

export interface IEstacoes {
  estacao_id: number;
  nome: string;
  uid: string;
}
