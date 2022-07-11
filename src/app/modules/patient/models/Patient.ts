import { Affiliation } from "./Affiliation";

export class Patient {
    id?: number;
    email?: string;
    name?: string;
    notes?: string;
    phone?: number;
    rfc?: string;
    affiliation?: Affiliation;
}