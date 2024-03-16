import { IBase } from "./base";

export interface IModelo extends IBase {
    descricao: string;
    marcaId?: number;
}