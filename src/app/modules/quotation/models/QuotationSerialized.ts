export class QuotationSerialized {

    // Activity
    activityId?: number;
    date?: string;
    status?: number;
    time?: string;

    // Affiliation
    code?: number;

    // Drug
    description?: string;

    // Employee
    employeeName?: string;

    // Patient
    patientName?: string;
    patientPhone?: number;
    patientRfc?: string;

    // Prescription
    prescriptionOffice?: string;
    quantity?: number;
    serie?: string;

    // Quotation
    quotationId?: number;
    file?: File;
    folio?: string;
    price?: number;

    // Requisition
    requisitionId?: number;
    consecutive?: string;

    // Supplier
    supplierId?: number;
    supplierEmail?: string;
    legalRepresentative?: string;
    supplierName?: string;
    supplierPhone?: number;
    supplierRfc?: string;

    // Tracking
    trackingId?: number;
    trackingNumber?: string;

    // User
    userId?: number;
    userOffice?: string;
}