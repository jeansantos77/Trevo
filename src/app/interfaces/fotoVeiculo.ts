import { IBase } from "./base";

export interface IFotoVeiculo extends IBase {
    path: string;
    nome: string;
    descricao: string;
}