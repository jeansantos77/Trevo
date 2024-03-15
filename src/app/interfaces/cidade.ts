export interface ICidade {
    id: number;
    nome: string;
    estadoId?: number;
    criadoPor? : string;
    criadoEm? : Date;
    atualizadoPor? : string;
    atualizadoEm? : Date;
}