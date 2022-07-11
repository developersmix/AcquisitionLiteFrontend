import { Assignment } from './Assignment';

export class Plaza {
    id?: number;
    adsc?: string;
    changeHistory?: string;
    code?: string;
    departure?: string;
    designation?: string;
    entrance?: string;
    notes?: string;
    position?: string;
    shift?: string;
    officeId?: string;
    assignments?: Assignment[];
}