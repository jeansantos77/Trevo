import { IBase } from "./base";

export interface IUsuario extends IBase {
    nome: string;
    email: string;
    login: string;
    senha: string;
    perfil: number;
    ativo: boolean;
}