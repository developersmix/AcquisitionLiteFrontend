import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequisitionStepsService } from 'src/app/modules/requisition/services/requisition-steps.service';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employee-step',
  templateUrl: './employee-step.component.html',
  styleUrls: ['./employee-step.component.scss']
})
export class EmployeeStepComponent implements OnInit {

  public employee: Employee = new Employee();
  
  constructor( private router: Router,
    private requisitionStepsService: RequisitionStepsService) { }

  ngOnInit(): void {
    this.employee = this.requisitionStepsService.getRequistionInformation().Employee;
  }

  nextPage() {
    /*
    if (this.employee.rfc && this.employee.name && this.employee.phone) {
        this.requisitionService.requisitionInformation.Employee = this.employee;
        this.router.navigate(['requisition/create/confirm-step']);
    } else {
      alert("Complete los campos obligatorios");
    }
    */this.router.navigate(['requisition/create/confirm-step']);
    
}

  prevPage() {
      this.router.navigate(['requisition/create/patient-step']);
  }


}
