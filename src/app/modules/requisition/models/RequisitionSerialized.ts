export class RequisitionSerialized {

    // Activity
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
    phone?: number;
    rfc?: string;

    // Prescription
    prescriptionOffice?: string;
    quantity?: number;
    serie?: string;

    // Requisition
    requisitionId?: number;
    consecutive?: string;

    // Tracking
    trackingId?: number;
    trackingNumber?: string;

    // User
    userId?: number;
    userOffice?: string;
}