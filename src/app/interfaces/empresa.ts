export interface IEmpresa {
    id: number;
    name: string;
    email: string;
    phone: string;
    cnpj: string;
    externalId: number;
    cep: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    active?: boolean;
    createdBy? : string;
    createdAt? : Date;
    updatedBy? : string;
    updatedAt? : Date;
}