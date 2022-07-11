import { Activity } from "../../requisition/models/Activity";

export class Quotation {
    id?: number;
    file?: File;
    folio?: string;
    price?: number;
    supplierId?: number;
    activity?: Activity;
}