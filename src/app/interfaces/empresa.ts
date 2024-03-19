import { IBase } from "./base";

export interface IEmpresa extends IBase{
    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidadeId: number;
}