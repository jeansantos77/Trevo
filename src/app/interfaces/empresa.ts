export interface IEmpresa {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidadeId: number;
    criadoPor? : string;
    criadoEm? : Date;
    atualizadoPor? : string;
    atualizadoEm? : Date;
}