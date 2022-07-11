import { Activity } from "./Activity";
import { Tracking } from './Tracking';

export class Purchase {
    id?: number;
    file?: File;
    number?: string;
    totalPrice?: number;
    activity?: Activity;
    tracking?: Tracking;
}