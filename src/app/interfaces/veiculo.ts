import { IBase } from "./base";
import { IDespesa } from "./despesa";
import { IFotoVeiculo } from "./fotoVeiculo";

export interface IVeiculo extends IBase{
    placa: string;
    renavam: string;
    anoFabricacao: number;
    anoModelo: number;
    portas: number;
    numeroMotor?: string;
    chassi?: string;
    categoriaVeiculoId: number;
    modeloId: number;
    versaoId: number;
    corId: number;
    combustivelId: number;
    cambioId: number;
    situacaoVeiculoId: number;
    valorVenda: number;
    valorMinimoVenda: number;
    codigoFipe: string;
    valorFipeEntrada: number;
    valorFipeAtual: number;
    obs?: string;
    fotos?: IFotoVeiculo[];
    
}