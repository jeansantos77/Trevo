import { IBase } from "./base";

export interface IVersao extends IBase {
    descricao: string;
    modeloId?: number;
}

export interface IVersaoList {
    Id: number;
    marca: string;
    modelo: string;
    descricao: string;
}