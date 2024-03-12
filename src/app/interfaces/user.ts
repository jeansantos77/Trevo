export interface IUser {
    id: number;
    name: string;
    email: string;
    login: string;
    password: string;
    profile: number;
    active?: boolean;
    createdBy? : string;
    createdAt? : Date;
    updatedBy? : string;
    updatedAt? : Date;
}