import { Prescription } from '../../prescription/models/Prescription';
import { Activity } from './Activity';
import { Tracking } from './Tracking';

export class Requisition {
    id?: number;
    consecutive?: string;
    notes?: string;
    activity?: Activity;
    prescription?: Prescription;
}