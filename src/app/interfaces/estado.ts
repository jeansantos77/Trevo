export interface IEstado {
    id: number;
    nome: string;
    uf?: string;
    paisId?: number;
    criadoPor? : string;
    criadoEm? : Date;
    atualizadoPor? : string;
    atualizadoEm? : Date;
}