export interface IState {
    id: number;
    name: string;
    uf: string;
    createdBy? : string;
    createdAt? : Date;
    updatedBy? : string;
    updatedAt? : Date;
}