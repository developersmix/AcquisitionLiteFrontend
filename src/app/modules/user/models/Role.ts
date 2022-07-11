import { Authority } from './Authority';

export class Role {
    id?: number;
    name?: string;
    descripcion?: string;
    authorities?: Authority[];
}