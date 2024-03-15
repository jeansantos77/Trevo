export interface IUsuario {
    id: number;
    nome: string;
    email: string;
    login: string;
    senha: string;
    telefone: string;
    cpf: string;
    perfil: number;
    ativo: boolean;
    criadoPor? : string;
    criadoEm? : Date;
    atualizadoPor? : string;
    atualizadoEm? : Date;
}