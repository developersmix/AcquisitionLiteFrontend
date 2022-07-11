import { Authority } from './Authority';
import { Employee } from '../../employee/models/Employee';
import { Office } from '../../office/models/Office';

export class User {

    id?: number;
    changeHistory?: string;
    email?: string;
    notes?: string;
    password?: string;
    username?: string;
    employeeId?: number;
    authorities?: Authority[];
    employee?: Employee;
    office?: Office;
}