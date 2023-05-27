export interface Dados {
  _uid: string;
  _unixtime: string;
  enviado: false;
  parametros: IParametros[];
}
export interface IParametros {
  _nomeParametro: string;
  _medida: number;
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
  utc: number;
}

export interface IAlertas {
  alerta_id: number;
  nome: string;
  valorMax: number;
  valorMinimo: number;
  nivel: number;
  ativo: number;
  parametro: IParametro;
}
export interface IParametro {
  parametro_id: number;
  nome: string;
  formula: string;
  fator: number;
  offset: number;
  ativo: number;
}

export interface IEstacoes {
  estacao_id: number;
  nome: string;
  uid: string;
}

export interface MedidaConvertidas {
  conversao: number;
  parametro: string;
}
