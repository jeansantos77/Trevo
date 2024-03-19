import { IBase } from "./base";

export interface IFornecedor extends IBase{
    nome: string;
    email?: string;
    tipoPessoa: string;
    contato?: string;
    telefone?: string;
    cnpj?: string;
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