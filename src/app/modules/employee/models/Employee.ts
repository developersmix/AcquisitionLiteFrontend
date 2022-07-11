import { User } from '../../user/models/User';
import { Assignment } from './Assignment';

export class Employee {
    id?: number;
    card?: string;
    email?: string;
    name?: string;
    notes?: string;
    number?: number;
    phone?: number;
    professionalLicense?: string;
    rfc?: string;
    assignmets?: Assignment[];
}