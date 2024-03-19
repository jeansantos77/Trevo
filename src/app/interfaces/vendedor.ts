import { IBase } from "./base";

export interface IVendedor extends IBase {
    nome: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidadeId: number;
    obs?: string;
    ativo: boolean;
}

