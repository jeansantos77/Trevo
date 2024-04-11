import { IBase } from "./base";

export interface IDespesa extends IBase {
    tipoDespesaId: number;
    tipoDespesa: string;
    data?: Date;
    valor: number;
    obs?: string;
}