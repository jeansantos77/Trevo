import { IBase } from "./base";

export interface IFinanceira extends IBase{
    nome: string;
    email?: string;
    contato?: string;
    telefone?: string;
    cnpj?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidadeId: number;
    obs?: string;
    ativo: boolean;
}