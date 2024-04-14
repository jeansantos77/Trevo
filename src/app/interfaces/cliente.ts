import { IBase } from "./base";
import { IModeloDesejado } from "./modeloDesejado";

export interface ICliente extends IBase {
    nome: string;
    nascimento: Date;
    cpf: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidadeId: number;
    formaPagtoId: number;
    telefone: string;
    email: string;
    obs?: string;
    modelos?: IModeloDesejado[]
}